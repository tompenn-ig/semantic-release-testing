import {Octokit} from "@octokit/rest";


async function commentBeforeRelease() {
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN, // Set this in your CI/CD environment
    });
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const prNumber = process.env.PR_NUMBER; // Pull request number (can be passed via CI)
    const message = "🚀 This PR is in the process of being released. Stay tuned!";
    await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: message,
    });
}

commentBeforeRelease().catch(err => {
    console.error("Failed to comment on the PR:", err);
    process.exit(1);
});