# diss-lexia

FOSSHACK Project

### What are features that help
1. Word Tracker: Automatically show pointer below next word to read (manual prev and next over-ride)
2. Horizontal line: To show the current line bein
3. Font changes: 
   - Specific font: OpenDyslexic Font, Lexend 
   - Letter spacing: 0.35x length avg letter width
   - 3.5x inter letter spacing
   - Line spacing: 150%
   - Avoid underlining and italics
   - Avoid capital letters
4. Replace words with simplers/shorter words
5. Replace words with onHover images/visual cues
6. Marked mirror characters (marker on characters to know their orientation)
7. Increase/Decrease Font Size
8. Dyslexia Friendliness Scorer

### What are the issues faced by them
1. Phoentic & Letter Jumping: Phonemes, letters etc get swapped
2. Movement due to jumping: 
3. Vertical Jumping: Words jumps vertically
4. Part of character Observability: See [here](https://danielbritton.info/dyslexia/)
5. Letters getting rotated: Can be fixed by having bottom heavy font. See [here](https://edition.cnn.com/2016/03/05/health/dyslexia-simulation/index.html)
6. Horizontal Jumping: Words jumps horizontally (very rarely)


### Prior Work
1. Spreeder
2. Reviews of other tools: 
3. Chromevox/ScreenReader
4. OpenDyslexic: Only changes the font
5. HelperBird: Paid software for advanced features

# Features finished by the end of FOSSHACK 23
1. Individual Word highlight with movement based on arrow and mouse click
2. Change font to Dyslexia friendly Open Dyslexic font family along with sizing options
3. Ruler functionality for ease in tracking
4. Line Spacing and Line Height adjustment
5. Text To Speech for highlighted word (HTML5 Depenedency, uses webkitSpeechRecognition API)

# Features to be implemented later on
- Replacing longer words with simpler shorter synonyms      IMPORTANT
- Visualize words on mouse hover for ease in comprehension
- Refactoring of existing code and squashing bugs

# Known Bugs
- Word highlight is buggy at new paragraphs presented by new <p> tags present in a webpage
- 

### Research
1. https://www.omoguru.com/omoblog/lexie/improve-skills-friendly-dyslexia-reading-tools/
2. https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide#:~:text=Avoid%20background%20patterns%20or%20pictures,vision%20deficiencies%20(colour%20blindness)
3. https://www.omoguru.com/lexie/
4. https://thereadabilityconsortium.org/research/
5. https://www.readingrockets.org/article/dyslexia-and-brain-what-does-current-research-tell-us
6. http://geon.github.io/programming/2016/03/03/dsxyliea
7. https://edition.cnn.com/2019/06/06/health/dyslexia-benefit-curnow/index.html
