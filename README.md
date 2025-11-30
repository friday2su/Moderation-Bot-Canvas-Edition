# Moderation Bot (Canvas Edition)

A premium Discord moderation bot featuring high-quality visual responses using Canvas, dual command support (Slash + Prefix), and a clean, modular architecture.

## Features

- **Visual Moderation**: Ban, Kick, and other actions generate a beautiful image card instead of plain text.
- **Dual Command System**: Supports both `/` Slash Commands and `!` Prefix commands.
- **Global Deployment**: Automatically deploys slash commands globally on startup.
- **Configurable Emojis**: All emojis are stored in `src/config/emojis.js` for easy customization.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
    *Note: `canvas` may require additional build tools on Windows. If you encounter errors, install [GTK 2](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows).*

2.  **Configuration**:
    Edit `.env` and fill in your details:
    ```env
    DISCORD_TOKEN=your_bot_token
    CLIENT_ID=your_client_id
    PREFIX=!
    ```

3.  **Run the Bot**:
    ```bash
    # friday2su — Moderation Bot (Canvas Edition)

    A Discord moderation bot focused on high-quality visual moderation responses (via Canvas), modular command organization, and support for both Slash and Prefix commands.

    **Key features**
    - **Visual moderation cards**: Actions like ban, kick, warn, and timeout generate an image card for clearer context.
    - **Slash + Prefix**: Commands support both Discord Slash commands and traditional prefix commands.
    - **Modular layout**: Commands and utilities are organized under `src/` for easy extension.
    - **Configurable emojis**: Centralized in `src/config/emojis.js` for quick customization.

    ## Repository Contents

    - `index.js` — Bot entrypoint and command loader.
    - `src/commands/general/` — General commands (avatar, botinfo, ping, poll, serverinfo, userinfo).
    - `src/commands/moderation/` — Moderation commands (ban, kick, lock, unlock, nick, purge, role, slowmode, timeout, unban, warn).
    - `src/config/emojis.js` — Emoji definitions used across commands.
    - `src/utils/canvasHelper.js` — Helpers to generate Canvas images for moderation actions.

    ## Installation

    Prerequisites:
    - Node.js 16+ (or the version you use in production).

    Install dependencies:
    ```powershell
    npm install
    ```

    Note: `canvas` can require native build tools on Windows. If you hit build errors, follow the node-canvas Windows install guide: https://github.com/Automattic/node-canvas/wiki/Installation:-Windows

    ## Configuration

    Create a `.env` in the repository root with these values:
    ```env
    DISCORD_TOKEN=your_bot_token
    CLIENT_ID=your_client_id
    PREFIX=!
    ```

    Adjust `PREFIX` to your preferred prefix (default `!`). Update `src/config/emojis.js` to customize emoji reactions.

    ## Running

    Start the bot:
    ```powershell
    node index.js
    ```

    During startup the bot will register slash commands (if implemented in `index.js`) and begin listening for messages and interactions.

    ## Commands (overview)

    - General:
        - `avatar`, `botinfo`, `ping`, `poll`, `serverinfo`, `userinfo`
    - Moderation:
        - `ban`, `kick`, `lock`, `unlock`, `nick`, `purge`, `role`, `slowmode`, `timeout`, `unban`, `warn`

    Inspect the individual files in `src/commands/` for usage details, options, and required permissions.

    ## Development

    - Add new command files under `src/commands/<category>/` following the existing patterns for Slash and Prefix support.
    - Keep reusable logic in `src/utils/` and configuration in `src/config/`.

    ## License

    This project is licensed under the MIT License — see the `LICENSE` file for details.

    ## Contributing & Contact

    File issues or PRs via GitHub. For quick questions, add an issue with the `question` tag.
