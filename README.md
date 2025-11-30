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
