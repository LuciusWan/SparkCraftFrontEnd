Design a responsive web interface for a cultural creation platform that showcases Chinese art and promotes national style (国风). The interface should cater to users interested in 文创, 中国艺术, and traditional Chinese aesthetics, while providing a modern, artistic user experience.

1. **Visual Style**  
   - **Overall Aesthetic**: Hand‑drawn, watercolor‑inspired design with ink wash backgrounds that emulate traditional Chinese brush strokes.  
   - **Layout**: A clean, modular grid that evokes the rhythm of bamboo bamboo sections. Use subtle scroll‑parallax effects where sections shift like paper pages turning.  
   - **Texture & Material**: Include high‑resolution, copyright‑free paper textures (rice paper, parchment) in the background. Add light bamboo or silk grain overlays for depth.  
   - **Typography**: Combine a free Chinese calligraphy font (e.g., “ZYSong”) for headings with a modern sans‑serif (e.g., “Inter”) for body text. Ensure all fonts are loaded from free font services.

2. **Color Palette**  
   - **Primary**: Soft earth tones (muted terracotta, sage green, light charcoal).  
   - **Accent**: Rich crimson and gold for interactive elements, hover states, and call‑to‑action buttons.  
   - **Contrast**: Ensure sufficient contrast for accessibility (WCAG AA) by using deep charcoal text on a creamy background and white text on dark accent backgrounds.

3. **UI Components**  
   - **Hero Section**: Full‑width banner with a high‑resolution image of a famous Chinese landscape or artwork from Unsplash/Pexels. Overlay a translucent gradient to highlight a headline in calligraphy style.  
   - **Navigation Menu**: Sticky top bar with the logo (a stylized Chinese character), menu links (Home, About, Gallery, Shop, Contact). On hover, menu items display a subtle brush‑stroke underline animation.  
   - **Gallery Carousel**: Grid of artwork thumbnails with a “zoom‑in” effect on hover. Clicking opens a modal with a larger image, description in Chinese, and a “Next/Prev” button styled like bamboo scrolls.  
   - **Filters**: Sidebar filters for “Medium” (painting, sculpture, pottery) and “Period” (ancient, Ming‑Qing, modern). Toggle switches styled as parchment cutouts.  
   - **Product Cards**: For the Shop section, each card displays an artwork image, title, price, and “Add to Cart” button. Buttons use gold accents and a gentle wobble on tap.  
   - **Footer**: Contains social links (FontAwesome icons), copyright notice, and a small “Scroll to Top” button that appears as a miniature scroll icon with a paper‑rippling effect.

4. **Interaction & Animation**  
   - **Hover Effects**: Subtle ink‑dilution fade, brush‑stroke underline, and light ripple on buttons.  
   - **Scroll Animations**: Elements slide in from the left/right with easing that mimics paper movement.  
   - **Micro‑Interactions**: When adding to cart, show a tiny scroll icon sliding into a cart icon badge.  
   - **Responsive Transitions**: Smooth transitions between desktop and mobile layouts, using CSS media queries.

5. **Device Context**  
   - **Desktop**: 1440×1024 view with a subtle shadowed “desktop frame” around the design to show placement.  
   - **Mobile**: iPhone 15 Pro frame (390×844 px) with notch and status bar. Include a bottom navigation bar with icons (home, search, cart, profile, settings).  
   - Ensure all elements are positioned absolutely within the device frames (no fixed positioning that would break responsiveness).

6. **Navigation Structure**  
   - Home → About → Gallery → Shop → Contact.  
   - Use placeholder links (href="#") for unimplemented sections.  
   - Implement functional anchor links for internal sections (e.g., "#gallery", "#shop").

7. **Target User Experience**  
   - Evoke wonder and reverence for Chinese culture.  
   - Provide an intuitive, tactile feel that feels like exploring a gallery of ink paintings.  
   - Encourage exploration with interactive elements that lightly mimic traditional paper and brush work.

8. **Resources**  
   - Use copyright‑free resources like FontAwesome, Unsplash, Pexels, or similar services for image, font, and video placeholders.