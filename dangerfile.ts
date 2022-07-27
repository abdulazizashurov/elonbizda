import { danger, fail, markdown, warn, message } from 'danger';

const pr = danger.github.pr;

// New files message 
const newFiles = danger.git.created_files
if(newFiles && newFiles.length > 0){
  message("New Files in this PR: \n - " + newFiles.join("- "));
}

// Always ensure we assign someone to a PR, if its a
if (pr.assignee === null) {
  const method = pr.title.includes('WIP') ? warn : fail;
  method('Please assign someone to merge this PR, and optionally include people who should review.');
}

// Commits should start with chore, ci, cd, docs, feat, fix, perf, refactor, revert, style, test
danger.git.commits.forEach(commit => {
  if (!commit.message.match(/^(feat:)|(fix:)|(major:)|(chore:)|(perf:)|(chore:)|(refactor:)|(style:)|(test:)|(ci:)|(cd:)|(docs:)/g)) {
    fail(`Commit message '${commit.message}' does match the correct format`)
  }
})

// Remind people to update lockfiles
const hasPackageChanges = danger.git.modified_files.includes("package.json")
const hasLockfileChanges = danger.git.modified_files.includes("yarn.lock")
if (hasPackageChanges && !hasLockfileChanges) {
  warn("There are package.json changes with no corresponding lockfile changes")
}