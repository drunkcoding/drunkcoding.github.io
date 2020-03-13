---
layout: splash
title:  "Test Driven Development"
date:   2020-03-13 14:37:36 +0800
categories: ["programming"]
tags: ["development", "clean code"]
---

- [Why Test Driven Development](#why-test-driven-development)
- [Laws of Test Driven Development](#laws-of-test-driven-development)

## Why Test Driven Development

The idea of test driven development has an ultimate goal of clean code, where programmer will not be hesitated to change code and add new feature and maintenance of projects become easy. When working for a company, programmers are usually involved in maintaining old code and developing new features on it. Cleaning old code can sometimes be difficult and time consuming, due to the complexity of fuzzy logic of old code. Sometimes, change code in one place will trigger problem in many other places. maintenance of the project may introduce new bug into the system. As a result, the whole process spends more time than needed, which becomes less productive.

Ovewrall programmers need a trustworthy way to verify their code and behaviour of the code. Test driven development is a proper approach, where programmer should trust their test completely. A delicated unit test should cover most part of the code, and each test case is tested by the code itself. The idea behind is that production code and unit test verify each other. A general phanomona developers can observe is when tests become more delicated, the code becomes more general. With a trustworthy testset, developers may not be afraid to change the code, since the testset can verify any change made to the system. Vise versa, the system becomes more flexiable and maintainable, since developers feels free to add new features and change old ones.

## Laws of Test Driven Development

1. You can’t write any production code until you have first written a failing spec.
2. You can’t write more of a unit test than is sufficient to fail, and not compiling is failing
3. You can’t write more production code than is sufficient to pass the currently failing unit test.

These three laws are strange at the first glance and are distinguished from our instinction on work follow. Usually, programmer write full function of the whole program before running any test. Also, for distributed system, programmers often run external test tool from client side and debug with logs. Under this approach, it is time-comsuming to find a bug inside the system, since any part of the code can go wrong and errors can be correlated. Writing the test code after the fact feels like waste since you already know it works.

If programmers write test first and write test only for a simple functionality of the system, the error can be found out quickly in the a few lines that just implemented. A task always comes with needs, so the programmers know what functionality they are going to implement before doing actual coding. It becomes feasible that test cases are written before production code. To have a testable system, the program must be decoupled, thus leading to a better design. Test driven development can also provide users with enviroment for independent development and deploybility.

1. write a unit test that fails (compile fail or run fail)
2. write the program to make the test works
3. refactor on tests, make it simple, and remove duplication

Since we are going to build the whole system based on tests, it is unavoidable that code become too specific to pass the test cases. As a result, the most important part is refactoring, with which we can achieve the goal of clean code. By refactoring the code, programmers change the structure of their code, rather behaviour. This process makes the code more general without violating any test cases. During this process, programmers are freely to make any change, even restructure that whole algorithm, since previous tests ensures that behaviour of the system does not change.

1. Each test case consists of sequence of arrange, act and assert
2. Each test case must be independent to each other
3. To make a test pass, change only behaviour
4. To make the code clean, change only structure
5. Test code structure matters, also need decoupling
6. Boundary conditions are tested before go to the real algorithm
