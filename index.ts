#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Defining the student class
class student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor (name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = [];     //Initialized an empty array for courses
        this.balance = 100;
    }

 // Method to enroll a student in a course
    enroll_course(course:string){
        this.courses.push(course);
    }

// Method to view Student's balance
    view_balance(){
        console.log(chalk.yellow(`Balance for ${this.name} : $ ${this.balance}\n`));
    }

// Method to pay fees
    pay_fees(amount: number){
        this.balance -= amount;
        console.log(chalk.yellow(`$ ${amount} Fees paid successfully for ${this.name}`));
        console.log(chalk.yellow(`Remaining Balance : $${this.balance}\n`));
    }

// Method to display student status
   student_status(){
        console.log(chalk.yellow(`STUDENT ID : ${this.id}`));
        console.log(chalk.yellow(`STUDENT NAME : ${this.name}`));
        console.log(chalk.yellow(`COURSES ENROLLED : ${this.courses}`));
        console.log(chalk.yellow(`BALANCE : ${this.balance}\n`));    
   }
}

// Defining the student_manager class to manage students
class student_manager{
    students: student[];

    constructor(){
        this.students = [];
    }

// Method to add new student
    add_student(name: string){
let stuDent = new student(name); 
        this.students.push(stuDent);
        console.log(chalk.yellow(`Student: ${name} added successfully, Student ID: ${stuDent.id}\n`));
    }

// Method to enroll a student in a course 
    enroll_student(student_id: number , course:string){
        let std_found= this.find_std(student_id);
        if(std_found){
            std_found.enroll_course(course);
            console.log(chalk.yellow(`${std_found.name} enrolled in ${course} successfully.\n`));
        }
    }

// Method to view student balance
    view_student_balance(student_id: number){
        let std_found= this.find_std(student_id);
        if(std_found){
            std_found.view_balance();
        }
        else{
            console.log(chalk.red(`\tStudent not found. Please a correct student ID\t`));
        }

    }

// Method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let std_found= this.find_std(student_id);
        if(std_found){
            std_found.pay_fees(amount);
        }
        else{
            console.log(chalk.red(`\tStudent not found. Please a correct student ID\t`));
        }
    }

// Method to display student status
    show_student_status(student_id:number){
        let std_found= this.find_std(student_id);
        if(std_found){
            std_found.student_status();
        }

    }

// Method to find student_id
    find_std(student_id: number){
        return this.students.find(std => std.id === student_id );
    }
} 

// Main function to run the program
async function main(){
    console.log(chalk.red("*".repeat(60)));
    console.log(chalk.green(`\tHey there! Welcome to my STUDENT MANAGEMENT SYSTEM\t`));
    console.log(chalk.red("*".repeat(60)));

    let stuDent_Manager= new student_manager();

//Using while loop to keep running the program
    while (true){
        let choice= await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: (chalk.red("Select an option")),
                choices: ["Add Student","Enroll Student","View Student Balance","Pay Fees","View Student Status","Exit"]
            }
        ]);

// Using Switch Case to handle user choice
        switch(choice.choices){
            case "Add Student":
                let name_input= await inquirer.prompt(
                    [
                        {
                            name: "name",
                            type: "input",
                            message: "Enter a Student Name:",
                        }
                    ]);
            stuDent_Manager.add_student(name_input.name);
            break;

            case "Enroll Student":
                let enroll_input= await inquirer.prompt(
                    [
                        {
                            name: "std_id",
                            type: "number",
                            message: "Enter a Student ID:",
                        },
                        {
                            name: "course",
                            type: "input",
                            message: "Enter a Course Name:",
                        }
                    ]);
            stuDent_Manager.enroll_student(enroll_input.std_id, enroll_input.course);
            break;

            case "View Student Balance":
                let balance_input= await inquirer.prompt(
                    [
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a Student ID:",
                        }
                    ]);
            stuDent_Manager.view_student_balance(balance_input.student_id);
            break;

            case "Pay Fees":
                let fee_input= await inquirer.prompt(
                    [
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a Student ID:",
                        },
                        {
                            name: "fee_amount",
                            type: "number",
                            message: "Enter the amount to pay:"
                        }
                    ]);
            stuDent_Manager.pay_student_fees(fee_input.student_id,fee_input.fee_amount);
            break;

            case "View Student Status":
                let status_input= await inquirer.prompt(
                    [
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a Student ID:"
                        }
                    ]);
            stuDent_Manager.show_student_status(status_input.student_id);
            break;

            case "Exit":
                console.log(chalk.red("*".repeat(60)));
                console.log(chalk.green(`\tExiting STUDENT MANAGEMENT SYSTEM...\t`));
                console.log(chalk.red("*".repeat(60)));
                process.exit();
        }
    }
}
// Calling main function
main();