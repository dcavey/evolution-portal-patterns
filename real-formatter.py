import re
import textwrap
import logging
import sys

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

WRAP_VARIABLE = 80
TAB_AS_CHARS = "   "

# Optional: Map speakers to emojis for a prettier look.
SPEAKER_EMOJIS = {
    "dirk-vandecavey_GCO2": "👤",
    "GitHub Copilot": "🤖",
}

def parse_chat(text):
    """
    Parse the raw chat text into a list of dictionaries with keys 'speaker' and 'message'.
    
    Only lines where the first character is alphanumeric and followed by valid characters
    ending with a colon are considered new messages.
    """
    pattern = re.compile(r"^(?P<speaker>[A-Za-z0-9][A-Za-z0-9\-\_ ]*):\s*(?P<message>.*)$")
    messages = []
    current_speaker = None
    current_message_lines = []

    def add_message(speaker, message_lines):
        if speaker is not None:
            messages.append({
                "speaker": speaker,
                "message": "\n".join(message_lines).strip()
            })

    for line in text.splitlines():
        if is_blank_line(line):
            if current_speaker is not None:
                current_message_lines.append("")
            continue

        match = pattern.match(line)
        if match:
            add_message(current_speaker, current_message_lines)
            current_speaker = match.group("speaker").strip()
            initial_msg = match.group("message").strip()
            current_message_lines = [initial_msg] if initial_msg else []
        else:
            if current_speaker is not None:
                current_message_lines.append(line)
            else:
                logging.warning("Line without a detected speaker: %s", line)

    add_message(current_speaker, current_message_lines)
    return messages

def is_blank_line(line):
    return line.strip() == ""

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
            # Leave Markdown indicators intact.
            formatted_lines.append(line)
        else:
            if line.strip():
                wrapped = textwrap.fill(line, WRAP_VARIABLE)
                formatted_lines.append(wrapped)
            else:
                formatted_lines.append("")
    
    formatted_message = "\n".join(formatted_lines)
    # Apply final indentation.
    indented_message = textwrap.indent(formatted_message, TAB_AS_CHARS)
    return indented_message

def format_chat_messages(messages):
    """
    Format the list of message dictionaries into prettier Markdown strings.
    Includes speaker emojis, a header, and horizontal dividers between messages.
    """
    formatted = []
    
    # Start with a header
    formatted.append("# Chat Transcript\n")
    
    for entry in messages:
        speaker = entry["speaker"]
        # Add an emoji if available.
        emoji = SPEAKER_EMOJIS.get(speaker, "")
        speaker_label = f"**{emoji} {speaker}**:" if emoji else f"**{speaker}**:"
        message_text = entry["message"]
        formatted_text = format_message_text(message_text)
        # Append the speaker and message
        formatted.append(f"{speaker_label}\n\n{formatted_text}\n")
        # Divider for clarity
        # formatted.append("---\n")
    return "\n".join(formatted)

def main(filename_base):
    input_filename = f"{filename_base}.txt"
    output_filename = f"{filename_base}.md"

    # Read the raw text from the input file
    try:
        with open(input_filename, "r", encoding="utf-8") as file:
            text = file.read()
        logging.info(f"Read chat text from {input_filename}")
    except Exception as e:
        logging.error(f"An error occurred while reading the file: {e}")
        return

    # Parse the raw text.
    chat_entries = parse_chat(text)
    logging.info(f"Parsed {len(chat_entries)} chat messages.")

    # Format the parsed messages.
    formatted_chat = format_chat_messages(chat_entries)

    # Write the output to a file with error handling.
    try:
        with open(output_filename, "w", encoding="utf-8") as file:
            file.write(formatted_chat)
        logging.info(f"Formatted chat saved to {output_filename}")
    except Exception as e:
        logging.error(f"An error occurred while writing to the file: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python real-formatter.py <filename_base>")
    else:
        filename_base = sys.argv[1]
        main(filename_base)