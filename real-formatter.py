import re
import textwrap
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

WRAP_VARIABLE = 80
TAB_AS_CHARS = "   "

text = """
dirk-vandecavey_GCO2: Suggest possible scenarios to realize the solution to the problem stated in the requirements document. 

GitHub Copilot: To realize the solution to the problem stated in the requirements document, you can consider the following scenarios:

Each of these scenarios has its own advantages and trade-offs. Choose the one that best fits your requirements and development environment.

dirk-vandecavey_GCO2: Provide pros and cons for each approach. 
- minimal coupling ( no impact on existing websites is preferred)
- integration of specific common features in the portal should be possible

GitHub Copilot: ### Scenario 1: Single Page Application (SPA) with JavaScript Framework

**Pros:**
- **Rich User Experience**: Provides a dynamic and responsive user interface.
- **Component Reusability**: Easy to reuse components across the portal.

**Cons:**
- **Initial Load Time**: May have a longer initial load time due to the size of the JavaScript bundle.
- **SEO Challenges**: Requires additional configuration for SEO optimization.

### Recommendation
Given the requirement for minimal coupling and the ability to integrate common features, 
**Scenario 5: Micro Frontends** is a strong candidate. It allows for independent development and deployment of each website, minimizing the impact on existing websites. Additionally, it provides the flexibility to integrate common features at the portal level.
"""

def parse_chat(text):
    """
    Parse the raw chat text into a list of dictionaries with keys 'speaker' and 'message'.
    
    Only lines where the first character is alphanumeric (A-Z, a-z, 0-9) and followed by
    letters, numbers, dashes, underscores, or spaces, then a colon, are considered as new messages.
    This prevents Markdown lines (like "**Pros:**") from being misinterpreted.
    """
    pattern = re.compile(r"^(?P<speaker>[A-Za-z0-9][A-Za-z0-9\-\_ ]*):\s*(?P<message>.*)$")
    messages = []
    current_speaker = None
    current_message_lines = []
    
    for line in text.splitlines():
        # Preserve blank lines (they may indicate paragraph breaks)
        if line.strip() == "":
            if current_speaker is not None:
                current_message_lines.append("")
            continue

        match = pattern.match(line)
        if match:
            # Found a new speaker line.
            if current_speaker is not None:
                messages.append({
                    "speaker": current_speaker,
                    "message": "\n".join(current_message_lines).strip()
                })
            current_speaker = match.group("speaker").strip()
            initial_msg = match.group("message").strip()
            current_message_lines = [initial_msg] if initial_msg else []
        else:
            # Not a speaker line; append to the current message.
            if current_speaker is not None:
                current_message_lines.append(line)
            else:
                logging.warning("Line without a detected speaker: %s", line)
    
    # Append the last message if available.
    if current_speaker is not None:
        messages.append({
            "speaker": current_speaker,
            "message": "\n".join(current_message_lines).strip()
        })
    
    return messages

def format_message_text(message):
    """
    Apply text wrapping to non-Markdown lines and indent the final message.
    Markdown lines (starting with -, #, >, or ``` ) are left untouched.
    """
    lines = message.split("\n")
    formatted_lines = []
    
    for line in lines:
        stripped_line = line.lstrip()
        if stripped_line.startswith(("-", "#", ">", "```")):
            # Leave common Markdown indicators intact.
            formatted_lines.append(line)
        else:
            if line.strip():
                wrapped = textwrap.fill(line, WRAP_VARIABLE)
                formatted_lines.append(wrapped)
            else:
                formatted_lines.append("")
    
    formatted_message = "\n".join(formatted_lines)
    # Final indentation applied at the end.
    indented_message = textwrap.indent(formatted_message, TAB_AS_CHARS)
    return indented_message

def format_chat_messages(messages):
    """
    Format the list of message dictionaries into Markdown strings.
    """
    formatted = []
    for entry in messages:
        speaker = entry["speaker"]
        message_text = entry["message"]
        formatted_text = format_message_text(message_text)
        formatted.append(f"**{speaker}**:\n\n{formatted_text}")
    return formatted

# Parse the raw text.
chat_entries = parse_chat(text)
logging.info("Parsed %d chat messages.", len(chat_entries))

# Format the parsed messages.
formatted_chat = format_chat_messages(chat_entries)

# Write the output to a file with error handling.
try:
    with open("OUTPUT.md", "w", encoding="utf-8") as file:
        for message in formatted_chat:
            file.write(f"{message}\n\n")
    logging.info("Formatted chat saved to OUTPUT.md")
except Exception as e:
    logging.error("An error occurred while writing to the file: %s", e)
