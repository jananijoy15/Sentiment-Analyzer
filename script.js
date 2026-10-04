function analyzeSentiment() {

    const text = document.getElementById("textInput").value.trim();

    if (text === "") {
        alert("Please enter some text!");
        return;
    }

    const positiveWords = [
        "good", "great", "excellent", "amazing",
        "happy", "love", "wonderful", "best",
        "awesome", "beautiful", "success",
        "enjoy", "nice", "fantastic", "perfect"
    ];

    const negativeWords = [
        "bad", "worst", "terrible", "sad",
        "hate", "angry", "poor", "horrible",
        "failure", "problem", "disappointed",
        "boring", "pain", "difficult", "awful"
    ];

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];

    let positiveCount = 0;
    let negativeCount = 0;

    let detectedPositive = [];
    let detectedNegative = [];

    words.forEach(word => {

        if (positiveWords.includes(word)) {
            positiveCount++;
            detectedPositive.push(word);
        }

        if (negativeWords.includes(word)) {
            negativeCount++;
            detectedNegative.push(word);
        }
    });

    let sentiment;
    let emoji;
    let score;

    if (positiveCount > negativeCount) {

        sentiment = "Positive";
        emoji = "😊";
        score = Math.min(
            100,
            50 + (positiveCount - negativeCount) * 10
        );

    } else if (negativeCount > positiveCount) {

        sentiment = "Negative";
        emoji = "😞";
        score = Math.min(
            100,
            50 + (negativeCount - positiveCount) * 10
        );

    } else {

        sentiment = "Neutral";
        emoji = "😐";
        score = 50;
    }

    document.getElementById("emoji").textContent = emoji;
    document.getElementById("sentiment").textContent =
        sentiment + " Sentiment";

    document.getElementById("score").textContent =
        "Sentiment Score: " + score + "%";

    const detected = [
        ...detectedPositive,
        ...detectedNegative
    ];

    document.getElementById("detectedWords").textContent =
        detected.length > 0
            ? detected.join(", ")
            : "No sentiment words detected.";
}