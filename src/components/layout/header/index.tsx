import * as React from "react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 dark:border-gray-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-foreground">Do It!</span>
                </Link>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        href="/vocabulary/learn"
                        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                    >
                        Học từ vựng
                    </Link>
                    <Link
                        href="/vocabulary/test"
                        className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                    >
                        Kiểm tra
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground/70 hover:text-foreground"
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;