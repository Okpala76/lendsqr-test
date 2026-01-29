import { render, screen } from "@testing-library/react";
import { LogoPage } from "../LogoPage";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    priority,
    ...props
  }: {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

describe("LogoPage Component", () => {
  // Positive Scenarios
  beforeEach(() => {
    render(<LogoPage />);
  });

  describe("Positive Scenarios", () => {
    test("should render all images with correct src paths and alt text", () => {
      const logoImage = screen.getByAltText("Lendsqr logo") as HTMLImageElement;
      const wordmarkImage = screen.getByAltText("Lendsqr") as HTMLImageElement;

      expect(logoImage.src).toContain("union.svg");
      expect(wordmarkImage.src).toContain("lendsqr.svg");
      expect(logoImage.alt).toBe("Lendsqr logo");
      expect(wordmarkImage.alt).toBe("Lendsqr");
    });

    test("should have correct image dimensions", () => {
      const logoImage = screen.getByAltText("Lendsqr logo") as HTMLImageElement;
      const wordmarkImage = screen.getByAltText("Lendsqr") as HTMLImageElement;

      expect(logoImage).toHaveAttribute("width", "24.75");
      expect(logoImage).toHaveAttribute("height", "25.003942489624023");
      expect(wordmarkImage).toHaveAttribute("width", "138.43972778320312");
      expect(wordmarkImage).toHaveAttribute("height", "36");
    });

    test("should properly structure brand group with logo and wordmark", () => {
      const brandGroup = screen.getByLabelText("Lendsqr");

      // Verify both logo and wordmark are within the brand group
      const logoInBrand = brandGroup.querySelector('img[alt="Lendsqr logo"]');
      const wordmarkInBrand = brandGroup.querySelector('img[alt="Lendsqr"]');

      expect(logoInBrand).toBeInTheDocument();
      expect(wordmarkInBrand).toBeInTheDocument();
    });

    test("should hide illustration from screen readers", () => {
      // Verify illustration exists but is hidden from screen readers
      const images = screen.getAllByRole("img");
      const illustrationImage = images[images.length - 1];
      expect(illustrationImage).toBeInTheDocument();

      const illustrationWrap = screen.getByAltText("Lendsqr Signin Logo");
      expect(illustrationWrap).toHaveAttribute("aria-hidden", "true");
    });
  });

  // Negative Scenarios
  describe("Negative Scenarios", () => {
    test("should not have missing or empty alt text", () => {
      const logoImage = screen.getByAltText("Lendsqr logo");
      const wordmarkImage = screen.getByAltText("Lendsqr");

      expect(logoImage.getAttribute("alt")).not.toBe("");
      expect(wordmarkImage.getAttribute("alt")).not.toBe("");
    });

    test("should not have invalid image dimensions", () => {
      const logoImage = screen.getByAltText("Lendsqr logo") as HTMLImageElement;
      const wordmarkImage = screen.getByAltText("Lendsqr") as HTMLImageElement;

      const logoWidth = parseFloat(logoImage.getAttribute("width") || "0");
      const logoHeight = parseFloat(logoImage.getAttribute("height") || "0");
      const wordmarkWidth = parseFloat(
        wordmarkImage.getAttribute("width") || "0",
      );
      const wordmarkHeight = parseFloat(
        wordmarkImage.getAttribute("height") || "0",
      );

      expect(logoWidth).toBeGreaterThan(0);
      expect(logoHeight).toBeGreaterThan(0);
      expect(wordmarkWidth).toBeGreaterThan(0);
      expect(wordmarkHeight).toBeGreaterThan(0);
    });

    test("should not have duplicate brand group sections", () => {
      const brandGroups = screen.getAllByLabelText("Lendsqr");
      expect(brandGroups.length).toBe(1);
    });

    test("should not have broken image src paths", () => {
      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        const src = img.getAttribute("src");
        expect(src).toBeTruthy();
        expect(src).not.toMatch(/undefined|null/);
      });
    });

    test("should maintain proper accessibility with hidden illustration", () => {
      const brandGroup = screen.getByLabelText("Lendsqr");
      const illustrationWrap = screen.getByAltText("Lendsqr Signin Logo");

      // Brand group should be accessible
      expect(brandGroup).not.toHaveAttribute("aria-hidden", "true");

      // Illustration should be hidden from screen readers
      expect(illustrationWrap).toHaveAttribute("aria-hidden", "true");
    });
  });
});
