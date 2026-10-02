# Screenshot claim: Codex instructions

Verified 2026-10-02 against official documentation:
https://developers.openai.com/codex/config-reference/
Redirect: https://learn.chatgpt.com/docs/config-file/config-reference

- `instructions` is documented as reserved for future use.
- `model_instructions_file` is documented as a replacement for built-in instructions.
- Neither fact establishes that a one-sentence replacement improves coding quality or makes every client equivalent to a direct API call.

Prefer concrete project instructions and scoped skills covering the output, architecture, visual criteria, performance budget, and verification. For explicitly requested configuration experiments, confirm client/version and supported settings, preserve a recoverable copy, and compare the same task and acceptance criteria. Do not promise that local config changes affect a managed cloud session. Do not describe configuration as bypassing higher-priority instructions or permission controls. Use OpenAI Docs for fresh product guidance.
