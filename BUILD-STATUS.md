# Local build contract

Use the pinned package manager from package.json, normal frozen installation, pnpm check and pnpm build. A successful local build validates static output; it does not prove production deployment, current operator hours, live weather or analytics delivery.

Weather can legitimately be unavailable during a build. The site retains that state and does not fabricate forecast success. The default Wrangler entry guards protocol/host and true404 before the static asset binding.
