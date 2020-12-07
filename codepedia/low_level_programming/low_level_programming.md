# What is Low-Level Programming?

A _low-level programming language_ is a programming language that provides little or no abstraction from a computer's instruction set architecture—commands or functions in the language map closely to processor instructions. Generally, this refers to either _machine code_ or _assembly language_. Because of the low (hence the word) abstraction between the language and machine language, low-level languages are sometimes described as being "close to the hardware". 

A program written in a low-level language can be made to run very quickly, with a small memory footprint. An equivalent program in a high-level language can be less efficient and use more memory. 

Low-level languages are simple, but considered difficult to use, due to numerous technical details that the programmer must remember.

## Machine Code

Machine code is the only language a computer can process directly without a previous transformation. 

Currently, programmers almost never write programs directly in machine code, because it requires attention to numerous details that a high-level language handles automatically. Furthermore, it requires memorizing or looking up numerical codes for every instruction, and is extremely difficult to modify.

True machine code is a stream of raw, usually binary, data. A programmer coding in "machine code" normally codes instructions and data in a more readable form such as decimal, octal, or hexadecimal which is translated to internal format by a program called a loader or toggled into the computer's memory from a front panel.

Although few programs are written in machine language, programmers often become adept at reading it through working with core dumps or debugging from the front panel.

Here's a function in hexadecimal representation of 32-bit x86 machine code to calculate the n<sup>th</sup> Fibonacci number:

```bash
8B542408 83FA0077 06B80000 0000C383
FA027706 B8010000 00C353BB 01000000
B9010000 008D0419 83FA0376 078BD989
C14AEBF1 5BC3
```

## Assembly Language

Second-generation languages provide one abstraction level on top of the machine code. In the early days of coding on computers, the first thing MIT hackers did was to write assemblers.

Assembly language has little semantics or formal specification, being only a mapping of human-readable symbols, including symbolic addresses, to opcodes, addresses, numeric constants, strings and so on. 

Typically, one machine instruction is represented as one line of assembly code. Assemblers produce object files that can link with other object files or be loaded on their own.

The same Fibonacci number calculator as above, but in x86-64 assembly language using AT&T syntax:

```bash
_fib:
    movl $1, %eax
.fib_loop:
    cmpl $1, %edi
    jbe .fib_done
    movl %eax, %ecx
    addl %ebx, %eax
    movl %ecx, %ebx
    subl $1, %edi
    jmp .fib_loop
.fib_done:
    ret
```