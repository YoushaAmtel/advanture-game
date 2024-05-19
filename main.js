import inquirer from 'inquirer';
import chalk from 'chalk';
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 55;
let enemyAttackDamage = 15;
let health = 100;
let attackDamage = 25;
let numHealthPotions = 5;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // percentage chance
let running = true;
console.log(chalk.blue("Welcome to the Dungeon!"));
const game = async () => {
    while (running) {
        console.log(chalk.blue("--------------------------------------"));
        let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
        let enemy = enemies[Math.floor(Math.random() * enemies.length)];
        console.log(chalk.red(`\t# ${enemy} has appeared! #\n`));
        while (enemyHealth > 0) {
            console.log(chalk.blue(`\tYour HP: ${health}`));
            console.log(chalk.red(`\t${enemy}'s HP: ${enemyHealth}`));
            console.log("\n\tWhat would you like to do?");
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Choose an action:',
                    choices: ['Attack', 'Drink Health Potion', 'Run']
                }
            ]);
            if (answer.action === 'Attack') {
                let damageDealt = Math.floor(Math.random() * attackDamage);
                let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
                enemyHealth -= damageDealt;
                health -= damageTaken;
                console.log(chalk.green(`\t> You strike the ${enemy} for ${damageDealt} damage.`));
                console.log(chalk.red(`\t> You receive ${damageTaken} in retaliation!`));
                if (health <= 0) {
                    console.log(chalk.red(`\t> You have taken too much damage, you are too weak to go on!`));
                    break;
                }
            }
            else if (answer.action === 'Drink Health Potion') {
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    numHealthPotions--;
                    console.log(chalk.green(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.`));
                    console.log(chalk.green(`\t> You now have ${health} HP.`));
                    console.log(chalk.yellow(`\t> You have ${numHealthPotions} health potions left.\n`));
                }
                else {
                    console.log(chalk.red(`\t> You have no health potions left! Defeat enemies for a chance to get one!`));
                }
            }
            else if (answer.action === 'Run') {
                console.log(chalk.yellow(`\tYou run away from the ${enemy}!`));
                continue;
            }
        }
        if (health <= 0) {
            console.log(chalk.red("You limp out of the dungeon, weak from battle."));
            break;
        }
        console.log(chalk.blue("--------------------------------------"));
        console.log(chalk.green(`# ${enemy} was defeated! #`));
        console.log(chalk.green(`# You have ${health} HP left. #`));
        if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
            numHealthPotions++;
            console.log(chalk.yellow(`# The ${enemy} dropped a health potion! #`));
            console.log(chalk.yellow(`# You now have ${numHealthPotions} health potion(s). #`));
        }
        const nextStep = await inquirer.prompt([
            {
                type: 'list',
                name: 'nextAction',
                message: 'What would you like to do now?',
                choices: ['Continue fighting', 'Exit dungeon']
            }
        ]);
        if (nextStep.nextAction === 'Exit dungeon') {
            console.log(chalk.blue("You exit the dungeon, successful from your adventures!"));
            break;
        }
    }
};
game();
