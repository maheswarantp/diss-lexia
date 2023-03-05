console.log("Diss-lexia extension started !!");

// Global variables for text highlight
var currentIndexWord = 0
var spans;
let errorStrings = ["", "\n", '"', ".", ","]
let paras;


let session = {
  'DyslexicFont': {
    'status': false,
    'family': "opendyslexic-regular",
    'size': 14
  },
  'Spacing': {
    'status': false,
    'letter': 0.1,
    'word': 0.35
  },
  'Ruler': {
    'status': false,
    'height': 24
  },
  'LineHeight': {
    'status': false,
    'factor': 1.5
  },
  'ReadAloud': {
    'status': false,
    'text': 'example'
  }
};


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.begin) {
      // Get the selected text
      // const selectedText = window.getSelection().toString();
      // speak("hii")

      sendResponse({ session: session });
    }
    else {
      console.log(request.session);
      var req = request.session;

      session['DyslexicFont'] = req.DyslexicFont;
      session['Spacing'] = req.Spacing;
      session['Ruler'] = req.Ruler;
      session['LineHeight'] = req.LineHeight;
      // session['ReadAloud'] = req.ReadAloud;

      console.log(session);
      // Font
      if (session['DyslexicFont']['status']) {
        applyFont("font-family", `${session['DyslexicFont']['family']}`);
        applyFont("font-size", `${session['DyslexicFont']['size']}`);
      } else {
        revertFont("font-family");
        revertFont("font-size");
      }

      // Spacing
      if (session['Spacing']['status']) {
        applySpacing("word-spacing", session['Spacing']['word']);
        applySpacing("letter-spacing", session['Spacing']['letter']);
      } else {
        revertSpacing("word-spacing");
        revertSpacing("letter-spacing");
      }

      // Ruler
      createRuler(session['Ruler']['status'], session['Ruler']['height']);

      // Following text
      createSpans()

      // Line Height
      if (session['LineHeight']['status'])
        applyLineHeight(session['LineHeight']['factor']);
      else
        revertLineHeight();

      // Web API
      // if (session['ReadAloud']['status'])
      //   speak(session['ReadAloud']['text'])
    }
  }
);

/* Create Spans for highlight*/
const createSpans = () => {
  paras = document.querySelectorAll("p")
  paras.forEach((para, index) => {
    para.classList.add(`p-${index}`)
    words = para.textContent.split(" ")
    words = words.filter(word => {
      if(!errorStrings.includes(word))
        return word
    })
    para.innerHTML = words.map((word, index) => `<span id=${index}>${word}</span>`)
    spans = para.querySelectorAll("p span")
    spans[currentIndexWord].style.color = "red"
  })
}

window.addEventListener('click', (e) => {
  currentIndexWord = e.target.id
  // console.log(e.target.parentElement.className);
  spans = document.querySelectorAll(`.${e.target.parentElement.className} span`)
  spans.forEach(span => span.style.color = "black")
  spans[currentIndexWord].style.color = "red"
})

window.addEventListener('keydown', (e)=>{
  spans[currentIndexWord].style.color = "black"
  if(e.keyCode === 37){
    currentIndexWord = Math.max(0, currentIndexWord - 1)
  } else if(e.keyCode === 39) {
    currentIndexWord = parseInt(currentIndexWord) + 1
  }
  spans[currentIndexWord].style.color = "red"
})

/* Font */
function applyFont(attr, input) {
  if (attr == "font-size")
    input = `${input}`;
  const elements = document.querySelectorAll('body *:not(script):not(style):not(head)');

  for (let i = 0; i < elements.length; i++)
    elements[i].style.cssText += `${attr}: ${input} !important;
    font-style: normal;
    text-decoration: none;
    text-transform: lowercase;`;


};

function revertFont(attr) {
  const elements = document.querySelectorAll('body *:not(script):not(style):not(head)');

  for (let i = 0; i < elements.length; i++)
    elements[i].style.removeProperty(attr);
}

/* Spacing */
function applySpacing(attr, input) {
  input = `${input}em`;
  document.querySelector('body').style[attr] = input;
};

function revertSpacing(attr) {
  document.querySelector('body').style.removeProperty(attr);
}

/* Ruler */
function createRuler(active, height) {
  var ruler = document.querySelector("#readingRuler");

  // If ruler doesn't exist:
  if (!ruler) {
    // Make ruler:
    ruler = document.createElement("div");
    ruler.id = "readingRuler";
    let body = document.querySelector("body")
    body.appendChild(ruler);
  }

  if (active) {
    // Active/Inactive:
    if (parseInt(active) === 0) {
      ruler.classList.add("inactive");
    } else {
      ruler.classList.remove("inactive");
    }

    ruler.style.setProperty('--height', `${height}px`);
    document.addEventListener('mousemove', e => {
      ruler.style.setProperty('--mouse-y', `${e.clientY - (height * 0.66)}px`);
    });
    ruler.style.setProperty('--hue', 'hsl(54, 97%, 49%)');
    ruler.style.setProperty('--opacity', 0.2);
  }
  else {
    ruler.style.setProperty('--opacity', 0);
  }
}

/* Line Height */
function getTagList(tag) {
  let body = document.querySelector('body');
  return body.querySelectorAll(tag);
}

function applyLineHeight(input) {
  let factor = parseFloat(input);
  const elements = document.querySelectorAll('body *:not(script):not(style):not(head)');

  for (let i = 0; i < elements.length; i++)
    elements[i].style.lineHeight = factor;
};

function revertLineHeight() {
  const elements = document.querySelectorAll('body *:not(script):not(style):not(head)');

  for (let i = 0; i < elements.length; i++)
    elements[i].style.removeProperty('line-height');
}
