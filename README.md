# Pearl Street Brewery

Speculative website for Pearl Street Brewery, a craft brewery in La Crosse, Wisconsin, brewing in a 100 year old former boot factory since 1999.

Built by [NeonFrame Web Design](https://neonframewebdesign.com).

## Live

Deployed via GitHub Pages: https://neonframewebdev.github.io/pearl-street-brewery/

## Stack

Pure HTML / CSS / JS. No build step. Deploys directly to GitHub Pages.

## Local development

```bash
python3 -m http.server 8765
# visit http://localhost:8765/
```

## Tests

```bash
./tests/check.sh
```

Checks asset path integrity, internal anchors, alt text, required meta, nav consistency, image headers, CSS/JS syntax, and enforces a no-em-dashes rule across all source files.

## Asset sources

Every image on this site came from a real, public Pearl Street Brewery web property. No stock imagery, no AI-generated images. See [IMAGE_CREDITS.md](./IMAGE_CREDITS.md) for every source URL.
