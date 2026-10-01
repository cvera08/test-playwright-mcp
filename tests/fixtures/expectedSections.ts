/**
 * Mirrors the section titles defined in full-resume/_data/data.yml.
 * Kept in sync manually today; see docs/AI-WORKFLOW.md for the agent-assisted
 * update flow when data.yml changes.
 */
export const expectedSections: { className: string; title: string }[] = [
    { className: 'profile', title: 'PROFESSIONAL SUMMARY' },
    { className: 'experience', title: 'WORK EXPERIENCE' },
    { className: 'project', title: 'PERSONAL PROJECTS' },
    { className: 'education', title: 'EDUCATION' },
    { className: 'award', title: 'KEY ACHIEVEMENTS' },
    { className: 'organization', title: 'TOOLS EXPERIENCE' },
    { className: 'language', title: 'LANGUAGES' },
    { className: 'hobbies', title: 'HOBBIES' },
    { className: 'publication', title: 'ADDITIONAL INFORMATION' },
];

export const expectedProjectLinks: string[] = [
    'https://github.com/cvera08/ai-stock-predictions',
    'https://github.com/cvera08/multi-games-artificial-intelligence-js',
    'https://github.com/cvera08/blockchain-automation',
];
