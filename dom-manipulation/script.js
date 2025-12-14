let quotes = [
  {
    text: "Small progress is still progress.",
    category: "Motivation",
  },
  {
    text: "First, make it work. Then make it right. Then make it fast.",
    category: "Programming",
  },
  {
    text: "Winners focus on progress, not perfection.",
    category: "Success",
  },
  {
    text: "Self-control is freedom.",
    category: "Discipline",
  },
  {
    text: "Peace begins when expectations end.",
    category: "Life",
  },
  {
    text: "Knowing yourself is the beginning of all wisdom.",
    category: "Philosophy",
  },
  {
    text: "Consistency turns dreams into habits.",
    category: "Motivation"
  }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const exportQuotes = document.getElementById("exportFile");
const categoryFilter = document.getElementById("categoryFilter");

const KEY = "quote";

loadQuote();

showQuoteBtn.addEventListener("click", showRandomQuote);
exportQuotes.addEventListener("click", exportData);

function showRandomQuote() {
  quoteDisplay.innerHTML = "";

  const random = Math.floor(Math.random() * quotes.length);

  const text = quotes[random].text;
  const category = quotes[random].category;
  
  const randomQuote = document.createElement("p");
  randomQuote.textContent = `${category}: ${text}`;

  quoteDisplay.appendChild(randomQuote);

  saveQuote();
}

function createAddQuoteForm() {
  quoteDisplay.innerHTML = "";

  const text = newQuoteText.value.trim();
  const quote = newQuoteCategory.value.trim();

  if (!text || !quote) return;

  quotes.push({text, quote});

  saveQuote();

  newQuoteText.value = "";
  newQuoteCategory.value = "";

  showRandomQuote();
}

function addQuote() {
  createAddQuoteForm();
}

function saveQuote() {
  try {
    localStorage.setItem(KEY, JSON.stringify(quotes));
    return true;
  } catch (error) {
    console.error("Failed to save quote.", error.message);
    return false;
  }
}

function loadQuote() {
  const storedQuotes = localStorage.getItem(KEY);

  if (storedQuotes) {
    try {
      quotes = JSON.parse(storedQuotes);
      return true;
     } catch (error) {
       console.error("Failed to load quote", error.message);
       return false;
     }
  }
}

function exportData() {
  const quotesToJSON = JSON.stringify(quotes, null, 2);
  const blob = new Blob([quotesToJSON], { type: "application/json" });
  const downloadLink = URL.createObjectURL(blob);
  const linkElement = document.createElement("a");

  linkElement.href = downloadLink;
  linkElement.download = "quotes.json";
  linkElement.click();

  URL.revokeObjectURL(blob);
}

function importFromJsonFile(event) {
  const file = event.target.files[0];

  if (!file) return;

  const fileReder = new FileReader();

  fileReder.onload = function () {
    try {
      const importedQuotes = JSON.parse(fileReder.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid file format.");
        return;
      }

      importedQuotes.forEach((quote) => {
        if (quote.text && quote.category) {
          quotes.push(quote);
        }
      });

      saveQuote();
      alert("Quotes imported successfully");
    } catch (error) {
      
    }
  };

  fileReder.readAsText(file);
}

function populateCategories() {
  const categories = quotes.map(quote => quote.category);

  const uniqueCategories = [...new Set(categories)];

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.toLowerCase();
    option.textContent = category;
    
    categoryFilter.append(option);
  });
}

function filterQuotes() {
  quoteDisplay.innerHTML = "";

  let selectedCategory = categoryFilter.value;

  if (selectedCategory === "all") {
    showRandomQuote();
  }
  
    if (selectedCategory === "motivation") {
      const motivationQuotes = quotes.filter(
        (quote) => quote.category === "Motivation"
      );

      const random = Math.floor(Math.random() * motivationQuotes.length);
      const text = motivationQuotes[random].text;
      const category = motivationQuotes[random].category;

      const p = document.createElement("p");
      p.textContent = `${category}: ${text}`;

      quoteDisplay.appendChild(p);

      saveQuote();
    }

  if (selectedCategory === "programming") {
    const programmingQuotes = quotes.filter(
      (quote) => quote.category === "Programming"
    );

    const random = Math.floor(Math.random() * programmingQuotes.length);
    const text = programmingQuotes[random].text;
    const category = programmingQuotes[random].category;

    const p = document.createElement("p");
    p.textContent = `${category}: ${text}`;

    quoteDisplay.appendChild(p);

    saveQuote();
  }

  if (selectedCategory === "success") {
    const successQuotes = quotes.filter(
      (quote) => quote.category === "Success"
    );

    const random = Math.floor(Math.random() * successQuotes.length);
    const text = successQuotes[random].text;
    const category = successQuotes[random].category;

    const p = document.createElement("p");
    p.textContent = `${category}: ${text}`;

    quoteDisplay.appendChild(p);

    saveQuote();
  }

  if (selectedCategory === "discipline") {
    const disciplineQuotes = quotes.filter(
      (quote) => quote.category === "Discipline"
    );

    const random = Math.floor(Math.random() * disciplineQuotes.length);
    const text = disciplineQuotes[random].text;
    const category = disciplineQuotes[random].category;

    const p = document.createElement("p");
    p.textContent = `${category}: ${text}`;

    quoteDisplay.appendChild(p);

    saveQuote();
  }

  if (selectedCategory === "life") {
    const lifeQuotes = quotes.filter((quote) => quote.category === "Life");

    const random = Math.floor(Math.random() * lifeQuotes.length);
    const text = lifeQuotes[random].text;
    const category = lifeQuotes[random].category;

    const p = document.createElement("p");
    p.textContent = `${category}: ${text}`;

    quoteDisplay.appendChild(p);

    saveQuote();
  }

  if (selectedCategory === "philosophy") {
    const philosophyQuotes = quotes.filter(
      (quote) => quote.category === "Philosophy"
    );

    const random = Math.floor(Math.random() * philosophyQuotes.length);
    const text = philosophyQuotes[random].text;
    const category = philosophyQuotes[random].category;

    const p = document.createElement("p");
    p.textContent = `${category}: ${text}`;

    quoteDisplay.appendChild(p);

    saveQuote();
  }
}

async function fetchQuotesFromServer() {
   try {
     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
     const data = await response.json();
     
     return data.slice(0, 10).map((post) => ({
       text: post.title,
       category: `User ${post.userId}`,
     }));
   } catch (error) {
     console.error("Failed to fetch server quotes.", error.message);
     return [];
   }
}

async function sendQuotesToServer(quotes) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quotes)
    });

    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Failed to send quotes to server", error.message); 
  }
}
 
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();

    if (!Array.isArray(serverQuotes)) {
      throw new Error("Invalid server data.");
    }

    serverQuotes.forEach((serverQuote) => {
      const localIndex = quotes.findIndex((localQuote) => {
        localQuote.text === serverQuote.text &&
          localQuote.category === serverQuote.category;
      });

      if (localIndex === -1) {
        quotes.push(serverQuote);
      } else {
        quotes[localIndex] = serverQuote;
      }
    });

    localStorage.setItem(KEY, JSON.stringify(quotes));

    await sendQuotesToServer(quotes);

    alert("Quotes synced with server!");

  } catch (error) {
    console.error("Sync failed:", error);
    alert("Failed to sync with server. Please try again later.");
  }
}

setInterval(syncQuotes, 30000);

populateCategories();
fetchQuotesFromServer();
syncQuotes();