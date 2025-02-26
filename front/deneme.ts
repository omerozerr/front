const { Client } = require("twitter-api-sdk");

async function main() {
    const client = new Client(
        "AAAAAAAAAAAAAAAAAAAAAG9jvgEAAAAAp3OUE%2BocsZZMr8z7ZXrgiMtrrt8%3DZhjSzzPj9oKg6Xe6rrlVueCSF9BonfRjvTAoyIAQ3MhFR4tqaI"
    );

    const response = await client.tweets.usersIdMentions("801133675698155520");


    console.log("response", JSON.stringify(response, null, 2));
}

main();
