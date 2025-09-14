#!/usr/bin/env node

/**
 * init-documentation.js
 *
 * Scans the repository for dependencies and creates cached documentation
 * summaries in the dep-docs directory for faster, more accurate responses.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DocumentationInitializer {
	constructor() {
		this.projectRoot = process.cwd();
		this.depDocsPath = path.join(this.projectRoot, 'dep-docs');
		this.dependencies = new Map();
		this.frameworks = [];
		this.buildTools = [];
	}

	/**
	 * Main initialization process
	 */
	async initialize() {
		console.log('🔍 Scanning project for dependencies...');

		try {
			await this.scanProjectStructure();
			await this.categorizeDependencies();
			await this.createDocumentationStructure();

			console.log('✅ Documentation initialization complete!');
			console.log(`📚 Documentation cache created at: ${this.depDocsPath}`);
			this.printSummary();
		} catch (error) {
			console.error('❌ Error during initialization:', error.message);
			process.exit(1);
		}
	}

	/**
	 * Scan project structure for configuration files
	 */
	async scanProjectStructure() {
		const configFiles = [
			'package.json',
			'requirements.txt',
			'Cargo.toml',
			'go.mod',
			'composer.json',
			'Gemfile',
			'build.gradle',
			'pom.xml'
		];

		for (const configFile of configFiles) {
			const filePath = path.join(this.projectRoot, configFile);
			if (fs.existsSync(filePath)) {
				console.log(`📄 Found: ${configFile}`);
				await this.parseConfigFile(configFile, filePath);
			}
		}
	}

	/**
	 * Parse configuration files to extract dependencies
	 */
	async parseConfigFile(fileName, filePath) {
		try {
			const content = fs.readFileSync(filePath, 'utf8');

			switch (fileName) {
				case 'package.json':
					await this.parsePackageJson(content);
					break;
				case 'requirements.txt':
					await this.parseRequirementsTxt(content);
					break;
				case 'Cargo.toml':
					await this.parseCargoToml(content);
					break;
				// Add more parsers as needed
				default:
					console.log(`⚠️  Parser not implemented for ${fileName}`);
			}
		} catch (error) {
			console.log(`⚠️  Error parsing ${fileName}: ${error.message}`);
		}
	}

	/**
	 * Parse package.json for Node.js dependencies
	 */
	async parsePackageJson(content) {
		const packageJson = JSON.parse(content);
		const deps = {
			...packageJson.dependencies,
			...packageJson.devDependencies
		};

		for (const [name, version] of Object.entries(deps || {})) {
			this.dependencies.set(name, {
				name,
				version: version.replace(/[^0-9.]/g, '').split('.')[0] || 'latest',
				type: 'npm',
				category: this.categorizePackage(name)
			});
		}
	}

	/**
	 * Parse requirements.txt for Python dependencies
	 */
	async parseRequirementsTxt(content) {
		const lines = content.split('\n').filter((line) => line.trim() && !line.startsWith('#'));

		for (const line of lines) {
			const match = line.match(/^([a-zA-Z0-9\-_]+)/);
			if (match) {
				const name = match[1];
				this.dependencies.set(name, {
					name,
					version: 'latest',
					type: 'python',
					category: this.categorizePythonPackage(name)
				});
			}
		}
	}

	/**
	 * Parse Cargo.toml for Rust dependencies
	 */
	async parseCargoToml(content) {
		const dependencySection = content.match(/\[dependencies\]([\s\S]*?)(?=\[|$)/);
		if (!dependencySection) return;

		const lines = dependencySection[1].split('\n').filter((line) => line.trim());
		for (const line of lines) {
			const match = line.match(/^([a-zA-Z0-9\-_]+)\s*=/);
			if (match) {
				const name = match[1];
				this.dependencies.set(name, {
					name,
					version: 'latest',
					type: 'rust',
					category: this.categorizeRustCrate(name)
				});
			}
		}
	}

	/**
	 * Categorize packages by type and purpose
	 */
	categorizePackage(packageName) {
		const categories = {
			frameworks: [
				'react',
				'vue',
				'angular',
				'express',
				'fastify',
				'koa',
				'next',
				'nuxt',
				'svelte'
			],
			libraries: ['lodash', 'axios', 'moment', 'date-fns', 'uuid', 'bcrypt', 'jsonwebtoken'],
			tools: [
				'webpack',
				'vite',
				'rollup',
				'babel',
				'typescript',
				'eslint',
				'prettier',
				'jest',
				'mocha',
				'cypress'
			]
		};

		for (const [category, packages] of Object.entries(categories)) {
			if (packages.some((pkg) => packageName.includes(pkg))) {
				return category;
			}
		}

		return 'libraries';
	}

	/**
	 * Categorize Python packages
	 */
	categorizePythonPackage(packageName) {
		const categories = {
			frameworks: ['django', 'flask', 'fastapi', 'tornado', 'pyramid'],
			libraries: ['requests', 'pandas', 'numpy', 'matplotlib', 'sqlalchemy'],
			tools: ['pytest', 'black', 'flake8', 'mypy', 'pip']
		};

		for (const [category, packages] of Object.entries(categories)) {
			if (packages.some((pkg) => packageName.includes(pkg))) {
				return category;
			}
		}

		return 'libraries';
	}

	/**
	 * Categorize Rust crates
	 */
	categorizeRustCrate(crateName) {
		const categories = {
			frameworks: ['actix-web', 'warp', 'rocket', 'axum', 'tide'],
			libraries: ['serde', 'tokio', 'reqwest', 'clap', 'uuid'],
			tools: ['cargo', 'rustfmt', 'clippy']
		};

		for (const [category, packages] of Object.entries(categories)) {
			if (packages.some((pkg) => crateName.includes(pkg))) {
				return category;
			}
		}

		return 'libraries';
	}

	/**
	 * Further categorize dependencies
	 */
	async categorizeDependencies() {
		for (const [name, info] of this.dependencies) {
			if (info.category === 'frameworks') {
				this.frameworks.push(info);
			} else if (info.category === 'tools') {
				this.buildTools.push(info);
			}
		}
	}

	/**
	 * Create documentation structure and placeholder files
	 */
	async createDocumentationStructure() {
		// Ensure dep-docs directory exists
		if (!fs.existsSync(this.depDocsPath)) {
			fs.mkdirSync(this.depDocsPath, { recursive: true });
		}

		// Create category directories
		const categories = ['frameworks', 'libraries', 'tools', 'examples'];
		for (const category of categories) {
			const categoryPath = path.join(this.depDocsPath, category);
			if (!fs.existsSync(categoryPath)) {
				fs.mkdirSync(categoryPath, { recursive: true });
			}
		}

		// Create placeholder documentation files
		for (const [name, info] of this.dependencies) {
			await this.createDocumentationPlaceholder(name, info);
		}

		// Create project overview
		await this.createProjectOverview();
	}

	/**
	 * Create documentation placeholder for a dependency
	 */
	async createDocumentationPlaceholder(name, info) {
		// Sanitize filename to avoid filesystem issues
		const safeName = name.replace(/[@/]/g, '_').replace(/[^a-zA-Z0-9\-_.]/g, '');
		const fileName = `${safeName}-v${info.version}.md`;
		const filePath = path.join(this.depDocsPath, info.category, fileName);

		if (fs.existsSync(filePath)) {
			return; // Don't overwrite existing documentation
		}

		const content = `# ${name} Documentation

> **Note**: This is a placeholder file created by init-documentation.
> The doc-researcher subagent will populate this with current documentation.

## Package Information
- **Name**: ${name}
- **Version**: ${info.version}
- **Type**: ${info.type}
- **Category**: ${info.category}

## Documentation Status
- [ ] Official documentation researched
- [ ] Integration patterns documented
- [ ] Common use cases identified
- [ ] Version compatibility checked
- [ ] Learning resources compiled

## Next Steps
This file will be automatically populated when:
1. A user asks about ${name}
2. The doc-researcher subagent is invoked
3. The documentation cache is refreshed

---
*Generated by claude-quest init-documentation on ${new Date().toISOString()}*
`;

		fs.writeFileSync(filePath, content);
	}

	/**
	 * Create project overview documentation
	 */
	async createProjectOverview() {
		const overviewPath = path.join(this.depDocsPath, 'project-overview.md');

		if (fs.existsSync(overviewPath)) {
			return; // Don't overwrite existing overview
		}

		const content = `# Project Overview

Generated on: ${new Date().toISOString()}

## Detected Technologies

### Frameworks (${this.frameworks.length})
${this.frameworks.map((f) => `- ${f.name} v${f.version}`).join('\n')}

### Build Tools (${this.buildTools.length})
${this.buildTools.map((t) => `- ${t.name} v${t.version}`).join('\n')}

### Total Dependencies
- **Total**: ${this.dependencies.size}
- **Frameworks**: ${this.frameworks.length}
- **Libraries**: ${Array.from(this.dependencies.values()).filter((d) => d.category === 'libraries').length}
- **Tools**: ${this.buildTools.length}

## Learning Recommendations

Based on the detected dependencies, consider these learning paths:
${this.generateLearningRecommendations()}

## Documentation Status

- **Total documentation files**: ${this.dependencies.size}
- **Research pending**: ${this.dependencies.size}
- **Last updated**: ${new Date().toISOString()}

## Usage

This overview helps the Claude-Quest system understand your project context and provide more targeted guidance.
`;

		fs.writeFileSync(overviewPath, content);
	}

	/**
	 * Generate learning recommendations based on detected dependencies
	 */
	generateLearningRecommendations() {
		const recommendations = [];

		if (this.frameworks.some((f) => f.name.includes('react'))) {
			recommendations.push(
				'- **React Development Path**: Components → Hooks → State Management → Routing'
			);
		}

		if (this.frameworks.some((f) => f.name.includes('vue'))) {
			recommendations.push(
				'- **Vue Development Path**: Templates → Composition API → Vuex/Pinia → Router'
			);
		}

		if (this.frameworks.some((f) => f.name.includes('express'))) {
			recommendations.push(
				'- **Node.js Backend Path**: Express basics → Middleware → Database integration → API design'
			);
		}

		if (this.frameworks.some((f) => f.name.includes('svelte'))) {
			recommendations.push(
				'- **Svelte Development Path**: Components → Reactivity → Stores → SvelteKit → Deployment'
			);
		}

		if (recommendations.length === 0) {
			recommendations.push('- Custom learning path will be generated based on your specific stack');
		}

		return recommendations.join('\n');
	}

	/**
	 * Print initialization summary
	 */
	printSummary() {
		console.log('\n📊 Summary:');
		console.log(`   Dependencies found: ${this.dependencies.size}`);
		console.log(`   Frameworks: ${this.frameworks.length}`);
		console.log(`   Build tools: ${this.buildTools.length}`);
		console.log('\n💡 Next steps:');
		console.log('   - Ask Claude about any dependency for detailed documentation');
		console.log('   - Use "teach-concept" for concept explanations');
		console.log('   - Use "version-check" to verify dependency versions');
		console.log('   - Documentation will be automatically populated as you ask questions');
	}
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const initializer = new DocumentationInitializer();
	initializer.initialize().catch(console.error);
}

export default DocumentationInitializer;
