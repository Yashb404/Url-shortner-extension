document.getElementById("shortenBtn").addEventListener("click", async () => {
  const input = document.getElementById("urlInput");
  const result = document.getElementById("result");
  const copyBtn = document.getElementById("copyBtn");
  const url = input.value.trim();

  if (!url) {
    result.textContent = "Please enter a URL.";
    copyBtn.style.display = "none";
    return;
  }

  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    const shortUrl = await res.text();
    result.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    copyBtn.style.display = "block";
    copyBtn.onclick = async () => {
      await navigator.clipboard.writeText(shortUrl);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    };
  } catch (e) {
    result.textContent = "Failed to shorten URL.";
    copyBtn.style.display = "none";
  }
});


chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  document.getElementById("urlInput").value = tabs[0].url;
});
