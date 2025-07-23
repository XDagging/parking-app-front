#!/usr/bin/env node
    import { program } from "commander";

    program
      .version("1.0.0")
      .description("Welcome to Daisyui for React Native")
    



    program.command("theme")
        .description("Selects a theme for your project")
        .option("-light, --light", "Sets up Light Project")
        .option("-dark, --dark", "Sets up Dark Project")
    //   .option("-n, --name <type>", "Add your name")
        .option("-theme, --theme", "Sets up a Custom Theme for your Project")
        .action((options) => {
            console.log(options);
            // if (options.name) {
            //     console.log(`Hello, ${options.name}!`);
            // } else {
            //     console.log("Hello, World!");
            // }
        });  

    program.parse();