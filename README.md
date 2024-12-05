<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD029 -->

<div align="center">

<h1 style="font-size: 2.5rem; font-weight: bold;">near/dev/hub (rebuild)</h1>
  <p>
    <strong>A decentralized platform for NEAR builders to submit and track funding requests</strong>
  </p>

</div>

<details>
  <summary>Table of Contents</summary>

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Running the app](#running-the-app)
  - [Building for production](#building-for-production)
  - [Running tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

</details>

## Features

- 🏠 Modern landing page
- 📝 Proposal submission and management
- 💰 Funding request tracking
- 📊 Progress visualization
- 🔍 Search and filter capabilities
- 📱 Fully responsive design

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Build Tool**: Vite

## Getting Started

### Install dependencies

```bash
bun install
```

### Running the app

First, run the development server:

```bash
bun run dev
```

The development server will start at `http://localhost:5173`.

### Building for production

```bash
# Create a production build
bun run build

# Preview the production build
bun run preview
```

### Running tests

```bash
pnpm run test
```

See the full [testing guide](./playwright-tests/README.md).

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components
│   └── ...
├── lib/               # Core utilities and SDK
├── routes/            # Application routes
└── data/              # Mock data and types
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you're interested in contributing to this project, please read the [contribution guide](./CONTRIBUTING).

<div align="right">
<a href="https://nearbuilders.org" target="_blank">
<img
  src="https://builders.mypinata.cloud/ipfs/QmWt1Nm47rypXFEamgeuadkvZendaUvAkcgJ3vtYf1rBFj"
  alt="Near Builders"
  height="40"
/>
</a>
</div>
