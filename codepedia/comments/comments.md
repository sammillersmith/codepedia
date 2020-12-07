# Comments Explained

Our own code can quickly become difficult to understand when we return to it—sometimes only a few hours later! For this reason, it’s often useful to leave a note or reminder in our code for our future selves or other fellow developers.

A _comment_ is an explanation or annotation in the source code of a computer program. They are added with the purpose of making the source code easier for humans to understand, and are generally ignored by compilers and interpreters. 

Comments are generally formatted as either block comments (also called mulit-line comments) or line comments (also called inline comments or single-line comments):

- _Block comments_ delimit a region of source code which may span multiple lines or a part of a single line. This region is specified with a start delimiter and an end delimiter.
- _Line comments_ either start with a comment delimiter and continue until the end of the line, or in some cases, start at a specific column (character line offset) in the source code, and continue until the end of the line.

Some programming languages employ both block and line comments with different comment delimiters. For example, C/C++ has block comments delimited by `/*` and `*/` that can span multiple lines and line comments delimited by `//`. Other languages support only one type of comment. For example, Python comments are line comments: they start with `#` and continue to the end of the line.

## Uses

How best to make use of comments is subject to dispute; different commentators have offered varied and sometimes opposing viewpoints. Here are some common ways comments are used:

### Code Description

Comments can be used to summarize code or to explain the programmer's intent. According to this school of thought, restating the code in plain English is considered superfluous; the need to re-explain code may be a sign that it is too complex and should be rewritten, or that the naming is bad.

> "Good comments don't repeat the code or explain it. They clarify its intent. Comments should explain, at a higher level of abstraction than the code, what you're trying to do." (Steve McConnell)

### Debugging

A common developer practice is to comment out a code snippet, meaning to add comment syntax causing that block of code to become a comment, so that it will not be executed in the final program. This may be done to exclude certain pieces of code from the final program, or (more commonly) it can be used to find the source of an error. 

By systematically commenting out and running only parts of the program, the source of an error can be determined, allowing it to be corrected.

### Metadata

Comments in a computer program often store metadata about a program file.

In particular, many software maintainers put submission guidelines in comments to help people who read the source code of that program to send any improvements they make back to the maintainer.

Other metadata includes: 

- The name of the creator of the original version of the program file
- The date when the first version was created
- The names of other people who have edited the program file so far
- The URL of documentation about how to use the program
- The name of the software license for this program file