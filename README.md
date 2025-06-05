## How to run (VS Code):

1. Clone the repository with git clone
2. Use the Live Server extention (From the index.html)


## 🔐 Setting Up SSH for GitHub Access (Recommended)

To start a push to this project and want seamless access without repeatedly entering credentials, follow these steps to configure SSH authentication with GitHub.

### ✅ Step-by-Step SSH Setup (Windows and Mac)

1. **Check for existing SSH keys**
   Open a terminal and run:

   ```bash
   ls ~/.ssh
   ```

   If `id_ed25519` and `id_ed25519.pub` don’t exist, generate them in Step 2.

2. **Generate a new SSH key** (if needed)

   ```bash
   ssh-keygen -t ed25519 -C "your-github-email@example.com"
   ```

   * Press Enter to accept default file location
   * Optionally add a passphrase (or leave blank)

3. **Add your SSH key to the ssh-agent**

   Start the agent and add your key:

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

4. **Add your SSH key to GitHub**

   * Run:

     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```

   * Copy the entire output

   * Go to [GitHub → Settings → SSH and GPG keys](https://github.com/settings/ssh/new)

   * Click **"New SSH key"**, name it, and paste the key

5. **Set the Git remote to use SSH**

   In the project directory, run:

   ```bash
   git remote set-url origin git@github.com:MiguelGarcia21/FrontEnd-Project.git
   ```

7. **You're ready to push!**

   ```bash
   git push
   ```

---

You only need to set this up once per machine. Afterward, Git will use your SSH key automatically for all GitHub interactions.
