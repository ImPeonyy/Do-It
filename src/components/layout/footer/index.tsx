import * as React from "react";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-background dark:border-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {/* Logo và Copyright */}
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-foreground">Do It!</span>
                        </Link>
                        <p className="text-sm text-foreground/60">
                            © {currentYear} Do It!. Tất cả quyền được bảo lưu.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
                        <Link
                            href="/"
                            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/vocabulary/learn"
                            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                        >
                            Học từ vựng
                        </Link>
                        <Link
                            href="/vocabulary/test"
                            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                        >
                            Kiểm tra
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;