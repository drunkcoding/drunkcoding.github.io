---
layout: splash
title:  "Clean Code"
date:   2020-02-28 23:27:33 +0800
categories: ["programming"]
tags: ["development", "clean code"]
---

Why we need clean code? What is the standards for clean code?

- [Introduction](#introduction)
  - [What is clean code](#what-is-clean-code)
  - [Why clean code is important](#why-clean-code-is-important)
  - [How to achieve clean code](#how-to-achieve-clean-code)
- [Names](#names)
  - [Express the usage](#express-the-usage)
  - [Avoid disinformation](#avoid-disinformation)
  - [Use of abbreviation](#use-of-abbreviation)
  - [Name Length](#name-length)
- [Functions](#functions)
  - [Function size](#function-size)
  - [Function argument](#function-argument)
  - [Function call](#function-call)
- [Form](#form)
  - [Comments](#comments)
  - [Code style](#code-style)
  - [Data structure](#data-structure)
- [Books to Read](#books-to-read)

## Introduction

In this section motivation of clean code will be discussed. Specification of clean code and design pattern to achieve the goal will be discussed later

### What is clean code

Clean code usually refers to a readable code. The code does not always need to be simple and easy to understand, since we have complex algorithms and mathematical or cache optimizaed code which only appears be be easy to professionals. However, it must be straight forward to it meaning and can represent its function without refering to comment a lot. It is easy to think of the programs should be neatly formatted as it is the first glance for the reader. Correct indent and spelling must be the basic requirement. In addition, the advanced aspect of clean code is a proper structure and flexibility of the program, which allows the co-developers to take over the tasks and modify the code easily. This is also a matter of convenient deployment and unit test in modern object-oriented programming. Specification of clean code can be generally applied on all languages and to varies ways of programming. Among all, a straightforward meaning and full functioning of test are the aim we want to achieve.

### Why clean code is important

As professional developers, in most cases, we do not write code only for ourselves. The code we write either contributes to the open source community or create business value when it is present to the customers. The code of professional developers affects both professional community and normal people. Messy code usually does harm to all.

For professional community, messy code does harm to productivity. When having messy code, newly hired people learn the old code slower. It is the old code that teaches new people, rather senior staff teaches freshman. As the development schedule is lag, companies will be spent extra money to resolve the same issue. Messy code usually hides and separate bugs in lines, which make the maintenance more difficult. As the lifetime of a product mostly consists of maintenance, this is harmful to the productivity and customers’ experience. Newbies will most likely to be hesitated to change the messy code and feel difficult to test it, thus loosing confident on the availability and safety of the product.

Clean code usually gives us independently deployable program, which is also independently developable. This provide convenience for team development and management of massive project.

### How to achieve clean code

If messy code already exists in the project, there is not easy to transfer it to clean code. Project manager can choose either reconstruct the code using new framework or try to improve code and test from the easiest part and then expend to the whole project. It can be a smoother approach to settle constrains and rules for clean code at the very beginning. The achievement is a rigid system where change and deployment are isolated to any behavior outside the scope. The settlement of clean code be as simple as variable and function naming to practice like test driven development and behavior driven development.

## Names

Variable and function names are the basic building block of a program. One saying states that writing a program should be the same as writing article where names and expressions directly express the intension of usage and can be read out as it is. This also means that names better express themselves without looking at the code used it.

### Express the usage

Here we prsent a simple example on variable naming as follow. The constants are used as a function parameter to jusge whether an input is belonged to an interval. Mathematically, an interval has a start and an end, and a proper interval can include either one, both or none. In the bad example, we can not intemperate the usage of the variable from its name, hence forcing the reader to investigate the detail of the code. We can improve this by integrating mathematically concept into the variable name. So that it can clear indicate its use for interval. Also, the usage is restricted by calling “DataInterval::OPEN”, whose meaning is clear anywhere in the code.

```c++
/* Bad example */
const int INCLUDE_NONE = 0;
const int INCLUDE_SECOND = 1;
const int INCLUDE_FIRST = 2;
const int INCLUDE_BOTH = 3;

/* Good Example */
enum class DataInterval {
  OPEN,
  CLOSED,
  OPEN_LEFT,
  OPEN_RIGHT
};
```

### Avoid disinformation

Any common mistake in the program is disinformation of variable. Disinformation means that the variable is used as its name or the name is too vague to decide its usage. This may cause confusing through out the program, as the meaning of the variable is changing. Since we are not considering programming in assembly language and embedded system where registers are always reused, variables surely do not cause performance issue. In the following example, we can see that the ambiguity is raised in variable “flag”, where it is used for two purposes and the variable name does not reveal what is it holding. We can revise that into a “isXXX” format to indicate a success to a function call or judgement.

```c++
/* Bad example */
bool flag = // some input or calculation
if (flag) {
  // do somthing
}
else {
  // do something
}

flag = // a second calculation or return value
if (flag) {
  // do somthing
}
else {
  // do something
}

/* Good Example */
bool isSetTimeSuccess = // some input or calculation
if (isSetTimeSuccess) {
  // do somthing
}
else {
  // do something
}

bool isPutHandleSuccess = // a second calculation or return value
if (isPutHandleSuccess) {
  // do somthing
}
else {
  // do something
}
```

### Use of abbreviation

The programmer will sometimes use abbreviation for simplify coding writing and write comment somewhere in the code to state its meaning. Abbreviation can only be allowed for convention, like “iter”/”it” for iterator. It is difficult to communicate with random abbreviation since it is hard to remember through out the program. Also, with modern IDE and compiler, type check easy is automatic, so that programmer have no reason to put type as prefix for each variable, such as “m” for member and “p” for pointer. The examples below show the correction on a wrong naming. In addition, “Info” can also be regard as vague naming, we should specify what information is contained. Also, the convention is that variable and class should be nouns, and methods to be verb.

```c++
/* Bad example */
uint32_t iSOF; // SOF = State of File
AOL* pLockInfo // AOGL = Array of Locks

/* Good Example */
uint32_t fileState;
Locks* grantedLocks;
```

### Name Length

Usually, we keep names short while express the full usage. But there can be some exception that allows long name. The general rule is to follow large scope and small scope convention, where name can be long in small scope as it is called from few places. Also, long name in small scope help reader to understand each step of function call. Derived class name is naturally long since more detail added. We can observe in the example below that “WriteBlock” has longer name as it is a derived class. The “handle” method has a short name since it is a public method, while each private call inside is long with full expression.

```c++
/* Good Example */
class Block {};
class WriteBlock : public Block {};
class ReadBlock : public Block {};

void WriteBlock::handle() {
  RequestWriteBlock();
  PrepareWriteBlockForStorage();
  SendWriteBlockToStorage();
  UodateWriteBlockSize();
}
```

## Functions

Back in the old days, there is a saying that function should only do one thing and do it well. It is true for the majority.

### Function size

A smaller function makes the reader easy to capture its functionality. When scroll down the page, readers can easily forget what is written above since they haven’t understood what the function does yet. If a function does multiple jobs, it obeys the expression of its name, as one concise name can only express one functionality. We can always refactor one function into multiple function calls and refactor very long function into classes. Once we have this kind of clear view, we can quickly go through each function and class without look at the detail.

### Function argument

If anyone has the experience of writing a program on windows platform, he or she will probably observe that windows system call usually has a very long argument list, together with a long document. This makes the caller inconvenient to do research before using the function, and hard to remember. For general cases, we want to make the function argument list short (keep it at most three arguments), so that the arguments can stick to the name of functions.

It is a violation of single job constrain of functions when using Boolean as argument (double-intakes). We’d better have good reason to do this. Double-intakes problem is a choice between rule constrain and simplicity of API. For open source library, we often see Boolean argument for behavior alternation, which is reasonable if it is split into further function calls in a simple way.

```c++
/* Bad Example */
void Push(int value, bool flag) {
  if (flag) // insert value and extend buffer when full
  else //  wait for a pop when buffer is full
}

/* Good Example */
// insert value and extend buffer when full
void PushEnforce(int value);

//  wait for a pop when buffer is full
void PushWait(int value);
```

There is a choice between long argument list for constructors and list of setters. Here we prefer list of setters, one for each member. This makes the decoupling derived class from the base class, where adding variable will infect one line rather structure. We do not need to concern the correctness of initialization, since it is taken care of by unit test.

If not really needed, do not output to an argument. The straightforward feeling of a function is input argument and return results. If design a function same as Linux system call that output to an argument, we’d better have outstanding document to alter the user about this behavior. We most cases we can return a single value as the result or return structure if multiple values are needed. Since C++11 have smart pointer and move construct, we do not need to concern performance penalty of return value, but a proper order of function call.

Do we need to care about invalid input of a function? If it is a public API, then yes, since we cannot predict user behavior. If it is only within the scope of a module, then it is not needed. Correct input will be granted by unit test. While allow null for the argument (defensive programming) making the function complex.

### Function call

For some function must be called in an order like (new, process, delete), (lock, process, unlock), we can wrap it up into another function for system state consistency. The idea is called temporal coupling, since we minimize the coupling to the scope of a single function call (no such problem for Golang defer).

A function must be careful to what it returns. A method that changes internal value should not have a return. The caller cannot know the whether the return value refer to the new state or old state. If the program needs to capture the old states, it must do this inside the state-changing function, so that hide unnecessary detail from caller. This also clearly separates between query and command. A function must not return an instance which allows the caller to know the system query chain. The complexity exposed will certainly increase coupling of the program. It is better only propagating dependency one at a time (Law of Demeter). It is convenient to expose the call chain within the scopr of a class

```c++
/* Bad Example */
System.OpenRootDir().OpenFile("test").Write("a", 3, 1);

/* Good Example */
String.lower().strip().split();
```

## Form

### Comments

When we need to write a comment, we should first ask ourselves whether the names have done their jobs. Usually names will explain everything in the program. There are things can do and cannot do:

- (can do) comments for copy right and explanation: explanation is restricted for limited cases, such as a brief technical detail.
- (cannot do) write document as comments: why not create a structured technical document?
- (cannot do) explain by repeating the code: useless words.
- (cannot do) TODO without outer development plan and document: no one knows what to do and how to do.
- (cannot do) talk about code far away: must put comment next to the code block which needs explanation

### Code style

The first rule of all, no matter what the code style is, it must be agreed among the team. Since a team share a same project, they must work on someone other part of the code in the future. The agreement on code style ease the burden of guessing and looking for the definition of the code. It is an easy practice that use the same IDE autoformatting configuration. Code to communicate and convey information is more important than correctness, since until the correct message is conveyed, it becomes easy to analysis code. In addition, white space and lines can serve as separation of functional blocks, which is also important for communication.

A big project does not imply big file size. Imagine that a file content that can be fit into the dislay of the screen, isn’t is easy to capture all content at the first glance? When a file has a thousand lines, it is hard to jump back and forth to get a full idea of function call at the first time. As a result, file should be split well depend on outreach calls and coupling.

Common rules for code management can be:

- scissors rule: all public at top and private at bottom; but follow convension is the first priority.
- stepdowm rule: parent at top, called child function at bottom, no function calls above

### Data structure

In data structure design, we mostly concern about dependency management and layering. It is bad design that expose private variable through getters and setters. If callers have direct access to private variable, then what is the purpose of being private. Usually, callers want the content of private variable for further calculation and checking, so that programmer can wrap this type of requirement a public method. In addition, getters should return data structure for business rather plain content. The rule is getter and setter should not reveal how classes is implemented (private information). IN general class protect us from new type but expose to new methods; structures vise versa

In a good software design, code dependency should cross boundary from concrete implementation and point to the abstract side. For example in designing a database application:

- there should be an access layer to know concrete schema and SQL; this should depend on both database and application access
- application does not need to know anything about schema, just issue control throught the layer
- layer should convert between business object and data rows

## Books to Read

- Refactoring: Improving the Design of Existing Code by Martin Fowler, with Kent Beck
- Test Driven Development by Kent Beck
- Clean Code by Robert Cecil Martin
- Fit for Developing Software: Framework for Integrated Tests by Rick Mugridge, Ward Cunningham
