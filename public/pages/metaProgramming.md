# Meta-Programming — basic concepts and use cases

In my academic degree, the course I hated the most was Programming Languages Principles, for some strange reason after my graduation it became my passion. I love learning about languages, their characteristics and how those can help me achieve more elegant solutions.

It is only natural in this field to investigate a powerful characteristic that resides in many languages, used by day-to-day frameworks — Meta-programming. Lets start by asking some questions.

## What is Programming?

Programming is the process of designing and building a program for accomplishing a task.
What is Meta-Programming?

Meta-programming is the concept of manipulating the underlying mechanics of the language. Changing semantics of the language and making programs that make programs.

The language in which the meta-program is written is called the metalanguage. The ability of a programming language to be its own metalanguage is called reflection. Reflection is a valuable language feature to facilitate meta-programming [source: wikipedia].

## Use Cases

In this article I will examine three popular languages and provide use cases of Meta-programming. Some are based on known frameworks others are my own examples.

### Javascript: eval as a JSON parser

Back in the days, when we didn’t have JSON.parse in Javascript, we had to use eval in order to parse JSONs.

`eval` is a built-in function in Javascript that gets a string and evaluate it as a Javascript code. For a given string that holds a JSON, it will evaluate it and return a Javascript object that represent its data.

```javascript
let jsonObj = eval("(" + jsonText + ")");
```

This is a simple example of code generation.

Even though this is not the scope of this article, please note that many consider “eval as evil”. I technically don’t think so. But you must be responsible when using eval. A good example for using eval correctly for parsing JSONs is available in Douglas Crockford’s GitHub repo. And of course using JSON.parse is best when possible.

### Ruby: Rails magic

Ruby on Rails has a feature some call “Rails Magic”. When investigating this, I learned that this magic is actually just our plain old Meta-Programming.

ActiveRecord which is commonly used in Ruby on Rails, is an ORM framework meant to make work on DBs much more friendly to the common Object Oriented programmer. One can simple define the following code:

```ruby
class User < ActiveRecord::Base
end
```

And will have a User class that will do operations on top of the application’s DB. User class is an abstraction over a users table, and each instance of User represents a row in that table.

In a RoR program a programmer can write:

```ruby
user = User.find_by_email("jon@doe.com")
```

This will be translated to:

```sql
SELECT * FROM users WHERE email="jon@doe.com"
```

But who defined the method find_by_email ? No one did, that method is not defined anywhere in our code, nor in ActiveRecord’s code. The secret resides in the method_missing function available in Ruby.

```ruby
def method_missing(method_id, *arguments, &block)  # do some fancy stuff, like running special codeend
```

When Ruby tries to call a method that doesn’t exist on any object he will call the method method_missing which normally just raises an Exception. method_id will be the method name being called, in this case find_by_email and arguments will be the arguments being passed to that method.

We can override it and then do whatever we want, for example translating the method name and parameters to an SQL query and then executing it.

This is a strong feature in Ruby, which allows us to implement many “magic” functionalities.

### Java: Spring Annotations

Java 1.5 (a.k.a 5) introduced annotations as a built in feature. Annotations are just meta-data tags that can be added to Java entities, such as methods, classes, parameters (and more).

Using annotations we can add more info, that will be available to the programmer, compiler or run-time.

In Spring, annotations are used as a form of meta-data in run-time, which opens up some fancy meta-programming options.

```java
@RestController
public class TestController{
  @RequestMapping("/test")​
  public Test test(){
     return new Test("this is working");
  }
}​
```

This code will tell spring to add a new API endpoint /test which will respond with the string “this is working”. How does it work? Simple, using Java’s new Reflection API.

In the next example we will create a program that runs the command given in its first argument. For this we will define a new annotation called Runner

```java
import java.lang.reflect.*;
import java.lang.annotation.*;@Retention(RetentionPolicy.RUNTIME)
@interface Runner {
  String cmd();
}
```

Now we will define a class that will hold our commands, we will call it Commands .

```java
class Commands {
  @Runner(cmd = "hi")
  public void f1(){
    System.out.println("Hiiiiiii");
  }

  @Runner(cmd = "bye")
  public void f2(){
    System.out.println("Byyyyyyyye");
  }
}
```

We defined a class with two methods, and annotated them with our Runner annotation and provided it the parameter cmd which defines our command (the argument’s value).

Now we can use it like so:

```java
public class MyClass {
  public static void main(String args[]) throws Exception {
    Class c = Commands.class;
    for (Method method: c.getDeclaredMethods()) {
      Runner annotation = method.getAnnotation(Runner.class);
      if(annotation.cmd().equals(args[0]) ){
        method.invoke(new Commands());
        return;
      }
    }
    System.out.println("No Such Method " + args[0]);
  }
}
```

Using this code, we iterate over Commands’s methods and check if it has an Runner annotation that has a cmd value which is equal to the argument given.

So for example running java MyClass hi will print Hiiiiiii .

Spring uses something very similar to add new functionality to our code, such as REST API, ORM functionality etc.

### Live Example: NodeJS Remote Method Server

Lets assume we have a number of services with local methods. Lets also assume we have a central service that holds “shared” methods.

Sometimes we want to call a local method foo and sometimes we want to call the method remoteBar which is implemented in the remote service.

The problem is, that in order to implement that we will need to use different code with the local methods and the remote methods.

For local methods we would simply go like methods.foo(); but for the remote server we will need to include a module that will help us communicate the server (lets assume over REST) and return the response. It will be something like so:

```javascript
try {
  let result = await axios.get(`${server_uri}/${methodName}`)​;
} catch(err){
  //handle error
}
```

This is bad for many reasons, it requires too much configuration and error handling for each call. It is much easy to make mistakes, and handling all the required parameters might be tedious.

What I would like to achieve is seamless remote method call like so:

```javascript
const res1 = methods.foo(); // call local method
const res2 = methods.bar(); // call remote method
```

Can Meta-Programming help here? Lets look at a client code:

<%HelloWorld {"msg":"test"}%>
