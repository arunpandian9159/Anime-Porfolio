import { profileData } from "../../../data/profileData";

/**
 * Command registry for the terminal
 * Each command has a name, description, and execute function
 */
export const COMMANDS = {
  help: { 
    description: "List all available commands",
    execute: () => (
      <div className="space-y-1">
        <div className="text-[#58a6ff] font-bold mb-2">Available Commands:</div>
        {Object.entries(COMMANDS).map(([name, cmd]) => (
          <div key={name} className="flex gap-4">
            <span className="text-[#27c93f] w-20">{name}</span>
            <span className="text-[#8b949e]">{cmd.description}</span>
          </div>
        ))}
        <div className="mt-3 text-[#8b949e] text-xs">
          Tip: Use ↑/↓ arrows to navigate command history
        </div>
      </div>
    ),
  },

  about: {
    description: "Display bio and contact info",
    execute: () => (
      <div className="space-y-2">
        <div className="border border-[#30363d] rounded p-3 bg-[#161b22]">
          <div className="text-[#58a6ff] font-bold text-lg mb-2">
            {profileData.profile.name}
          </div>
          <div className="text-[#f0883e] mb-2">
            {profileData.profile.headline} Developer
          </div>
          <div className="text-[#c9d1d9] text-sm leading-relaxed">
            {profileData.profile.shortBio}
          </div>
          <div className="mt-3 pt-3 border-t border-[#30363d] space-y-1 text-sm">
            <div className="flex gap-2">
              <span className="text-[#8b949e]">📍</span>
              <span className="text-[#c9d1d9]">
                {profileData.profile.location}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8b949e]">📧</span>
              <a
                href={`mailto:${profileData.profile.email}`}
                className="text-[#58a6ff] hover:underline"
              >
                {profileData.profile.email}
              </a>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8b949e]">📱</span>
              <span className="text-[#c9d1d9]">
                {profileData.profile.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  skills: {
    description: "List technical skills",
    execute: () => (
      <div className="space-y-3">
        <div className="text-[#58a6ff] font-bold">Technical Skills:</div>

        <div>
          <div className="text-[#f0883e] text-sm mb-1">Frontend</div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.frontend.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-[#1f6feb]/20 text-[#58a6ff] rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[#f0883e] text-sm mb-1">Backend</div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.backend.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-[#238636]/20 text-[#3fb950] rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[#f0883e] text-sm mb-1">Tools</div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.tools.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-[#a371f7]/20 text-[#a371f7] rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  projects: {
    description: "Show project summaries",
    execute: () => (
      <div className="space-y-3">
        <div className="text-[#58a6ff] font-bold">Featured Projects:</div>
        {profileData.projects
          .filter((p) => p.featured)
          .map((project, index) => (
            <div
              key={index}
              className="border border-[#30363d] rounded p-3 bg-[#161b22]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#f0883e]">
                  {project.icon && <i className={project.icon} />}
                </span>
                <span className="text-[#c9d1d9] font-semibold">
                  {project.title}
                </span>
                {project.isPublished && (
                  <span className="px-1.5 py-0.5 bg-[#238636]/20 text-[#3fb950] rounded text-xs">
                    IEEE Published
                  </span>
                )}
              </div>
              <div className="text-[#8b949e] text-sm mb-2">
                {Array.isArray(project.description)
                  ? project.description[0].slice(0, 100) + "..."
                  : project.description.slice(0, 100) + "..."}
              </div>
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 bg-[#30363d] text-[#8b949e] rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] text-xs hover:underline mt-2 inline-block"
                >
                  View Live →
                </a>
              )}
            </div>
          ))}
        <div className="text-[#8b949e] text-xs">
          Type 'projects --all' to see all {profileData.projects.length}{" "}
          projects
        </div>
      </div>
    ),
  },

  contact: {
    description: "Show contact methods",
    execute: () => (
      <div className="space-y-2">
        <div className="text-[#58a6ff] font-bold">Contact Information:</div>
        <div className="border border-[#30363d] rounded p-3 bg-[#161b22] space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[#f0883e] w-6">📧</span>
            <span className="text-[#8b949e]">Email:</span>
            <a
              href={`mailto:${profileData.profile.email}`}
              className="text-[#58a6ff] hover:underline"
            >
              {profileData.profile.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f0883e] w-6">📱</span>
            <span className="text-[#8b949e]">Phone:</span>
            <span className="text-[#c9d1d9]">{profileData.profile.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#f0883e] w-6">📍</span>
            <span className="text-[#8b949e]">Location:</span>
            <span className="text-[#c9d1d9]">
              {profileData.profile.location}
            </span>
          </div>
        </div>
        <div className="text-[#8b949e] text-xs">
          Type 'social' to see social media links
        </div>
      </div>
    ),
  },

  resume: {
    description: "Download resume",
    execute: () => {
      // Trigger download
      const link = document.createElement("a");
      link.href = profileData.profile.resume;
      link.download = "Arunpandian_C_Resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return (
        <div className="space-y-2">
          <div className="text-[#3fb950]">✓ Resume download initiated!</div>
          <div className="text-[#8b949e] text-sm">
            If the download doesn't start automatically,{" "}
            <a
              href={profileData.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              click here
            </a>
          </div>
        </div>
      );
    },
  },

  social: {
    description: "Display social links",
    execute: () => (
      <div className="space-y-2">
        <div className="text-[#58a6ff] font-bold">Social Links:</div>
        <div className="border border-[#30363d] rounded p-3 bg-[#161b22] space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[#c9d1d9] w-6">
              <i className="fab fa-github" />
            </span>
            <span className="text-[#8b949e]">GitHub:</span>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              {profileData.socials.github.replace("https://github.com/", "")}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#0a66c2] w-6">
              <i className="fab fa-linkedin" />
            </span>
            <span className="text-[#8b949e]">LinkedIn:</span>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              {profileData.socials.linkedin.replace(
                "https://www.linkedin.com/in/",
                "",
              )}
            </a>
          </div>
        </div>
      </div>
    ),
  },

  clear: {
    description: "Clear terminal output",
    execute: () => null, // Handled specially in Terminal.jsx
  },

  experience: {
    description: "Display work history",
    execute: () => (
      <div className="space-y-3">
        <div className="text-[#58a6ff] font-bold">Work Experience:</div>
        {profileData.experience.map((exp, index) => (
          <div
            key={index}
            className="border border-[#30363d] rounded p-3 bg-[#161b22]"
          >
            <div className="text-[#c9d1d9] font-semibold">{exp.role}</div>
            <div className="text-[#f0883e] text-sm">{exp.company}</div>
            <div className="text-[#8b949e] text-xs mb-2">{exp.duration}</div>
            <div className="flex flex-wrap gap-1">
              {exp.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 bg-[#30363d] text-[#8b949e] rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching command suggestions
 */
const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
};

/**
 * Find similar commands using fuzzy matching
 */
const findSimilarCommands = (input) => {
  const commandNames = Object.keys(COMMANDS);
  const suggestions = commandNames
    .map((cmd) => ({
      command: cmd,
      distance: levenshteinDistance(input.toLowerCase(), cmd),
    }))
    .filter((item) => item.distance <= 3) // Max 3 edits
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map((item) => item.command);

  return suggestions;
};

/**
 * Execute a command and return the output
 * @param {string} input - The command string to execute
 * @returns {JSX.Element|string} - The command output
 */
export const executeCommand = (input) => {
  const trimmedInput = input.trim().toLowerCase();

  // Handle empty input
  if (!trimmedInput) {
    return "";
  }

  // Handle 'projects --all' flag
  if (trimmedInput === "projects --all") {
    return (
      <div className="space-y-3">
        <div className="text-[#58a6ff] font-bold">All Projects:</div>
        {profileData.projects.map((project, index) => (
          <div
            key={index}
            className="border border-[#30363d] rounded p-3 bg-[#161b22]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#f0883e]">
                {project.icon && <i className={project.icon} />}
              </span>
              <span className="text-[#c9d1d9] font-semibold">
                {project.title}
              </span>
              {project.featured && (
                <span className="px-1.5 py-0.5 bg-[#f0883e]/20 text-[#f0883e] rounded text-xs">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 bg-[#30363d] text-[#8b949e] rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Check if command exists
  const command = COMMANDS[trimmedInput];
  if (command) {
    return command.execute();
  }

  // Command not found - show error with suggestions
  const suggestions = findSimilarCommands(trimmedInput);

  return (
    <div className="space-y-2">
      <div className="text-[#f85149]">Command not found: '{input}'</div>
      {suggestions.length > 0 && (
        <div className="text-[#8b949e]">
          Did you mean:{" "}
          {suggestions.map((cmd, i) => (
            <span key={cmd}>
              <span className="text-[#58a6ff]">{cmd}</span>
              {i < suggestions.length - 1 && ", "}
            </span>
          ))}
          ?
        </div>
      )}
      <div className="text-[#8b949e] text-sm">
        Type 'help' to see all available commands
      </div>
    </div>
  );
};
