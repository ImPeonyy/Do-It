"use client";

import Link from "next/link";
import * as React from "react";

const HomePage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    return (
        <>
            <div className="page">
                {/* Floating blobs background */}
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />

                {/* Navbar */}
                <header className="nav">
                    <div className="nav-left">
                        <div className="logo">
                            <span className="logo-icon">✨</span>
                            <span className="logo-text">Do-It</span>
                        </div>
                    </div>
                    <nav className="nav-links">
                        <button className="nav-link">Tính năng</button>
                        <button className="nav-link">Flashcard</button>
                        <button className="nav-link">Lịch học</button>
                        <button className="nav-link">Thống kê</button>
                    </nav>
                    <div className="nav-actions">
                        {!isLoggedIn && (
                            <Link href="/login">
                                <button className="btn ghost">Đăng nhập</button>
                            </Link>
                        )}
                        <Link href="/dashboard">
                            <button className="btn primary">Bắt đầu ngay</button>
                        </Link>
                    </div>
                </header>

                {/* Hero section */}
                <main className="hero">
                    <div className="hero-left">
                        <div className="badge">
                            <span className="badge-dot" />
                            <span className="badge-text">Nền tảng học tập thông minh</span>
                        </div>
                        <h1 className="hero-title">
                            <span className="gradient-text">Học tập</span> hiệu quả,
                            <br />
                            <span className="underline">ghi nhớ</span> lâu dài.
                        </h1>
                        <p className="hero-subtitle">
                            Do-It giúp bạn học tập thông minh với flashcard, ôn tập theo phương pháp khoa học, và theo
                            dõi tiến độ học tập mỗi ngày – công cụ học tập đầy cảm hứng và hiệu quả nhất.
                        </p>

                        <div className="hero-actions">
                            <Link href="/dashboard">
                                <button className="btn primary big">Bắt đầu học ngay</button>
                            </Link>
                            <Link href="/dashboard">
                                <button className="btn glass big">Xem hướng dẫn</button>
                            </Link>
                        </div>

                        <div className="hero-metrics">
                            <div className="metric">
                                <span className="metric-value">50K+</span>
                                <span className="metric-label">Flashcard đã được học thành công</span>
                            </div>
                            <div className="metric">
                                <span className="metric-value">85%</span>
                                <span className="metric-label">Tỷ lệ ghi nhớ trung bình</span>
                            </div>
                            <div className="metric">
                                <span className="metric-value">30+</span>
                                <span className="metric-label">Ngày học liên tiếp kỷ lục</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero right content */}
                    <div className="hero-right">
                        <div className="card main-card">
                            <div className="card-header">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                                <span className="card-title">Lịch học hôm nay</span>
                            </div>
                            <div className="card-body">
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot blue" />
                                        <div>
                                            <div className="timeline-title">Học 25 flashcard Toán học</div>
                                            <div className="timeline-subtitle">Toán học • 08:00 sáng</div>
                                        </div>
                                        <span className="tag blue">Đang học</span>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-dot purple" />
                                        <div>
                                            <div className="timeline-title">Ôn tập từ vựng Tiếng Anh</div>
                                            <div className="timeline-subtitle">Tiếng Anh • 10:30 sáng</div>
                                        </div>
                                        <span className="tag purple">Sắp đến</span>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-dot green" />
                                        <div>
                                            <div className="timeline-title">
                                                Hoàn thành ôn tập &quot;Lịch sử Việt Nam&quot;
                                            </div>
                                            <div className="timeline-subtitle">Lịch sử • 21:00 tối</div>
                                        </div>
                                        <span className="tag green">Đã hoàn thành</span>
                                    </div>
                                </div>

                                <div className="stats-row">
                                    <div className="mini-card">
                                        <span className="mini-label">Chuỗi ngày học liên tiếp</span>
                                        <span className="mini-value">14 ngày 🔥</span>
                                        <div className="progress">
                                            <div className="progress-bar" />
                                        </div>
                                    </div>
                                    <div className="mini-card">
                                        <span className="mini-label">Mức độ ghi nhớ</span>
                                        <span className="mini-value">87%</span>
                                        <div className="pill-row">
                                            <span className="pill active">Toán học</span>
                                            <span className="pill">Tiếng Anh</span>
                                            <span className="pill">Lịch sử</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="floating-card flashcard">
                            <div className="floating-title">Flashcard hôm nay</div>
                            <div className="floating-content">
                                <span className="floating-label">Câu hỏi</span>
                                <p className="floating-question">&quot;Pythagorean theorem&quot; là công thức gì?</p>
                                <button className="btn pill-btn">Lật thẻ ✨</button>
                            </div>
                        </div>

                        <div className="floating-card streak">
                            <div className="floating-title">Tiến độ tuần này</div>
                            <div className="streak-row">
                                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d, i) => (
                                    <div key={d} className={`streak-dot ${i < 5 ? "streak-dot-active" : ""}`}>
                                        <span>{d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Bottom section */}
                <section className="bottom">
                    <div className="bottom-card">
                        <div>
                            <h2>Học tập thông minh, hiệu quả hơn mỗi ngày.</h2>
                            <p>
                                Kết hợp flashcard thông minh, phương pháp ôn tập khoa học, và dashboard theo dõi tiến độ
                                trong một giao diện đẹp mắt, đầy cảm hứng. Mỗi lần mở Do-It là một bước tiến gần hơn đến
                                thành công trong học tập.
                            </p>
                        </div>
                        <Link href="/dashboard">
                            <button className="btn primary big glow">Bắt đầu học ngay hôm nay</button>
                        </Link>
                    </div>
                </section>
            </div>

            {/* Local styles for this landing page */}
            <style jsx>{`
                .page {
                    position: relative;
                    min-height: 100vh;
                    padding: 24px 40px 40px;
                    background: radial-gradient(circle at top left, #1f2937, #030712);
                    color: #e5e7eb;
                    overflow: hidden;
                    font-family:
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .blob {
                    position: absolute;
                    border-radius: 999px;
                    filter: blur(60px);
                    opacity: 0.45;
                    mix-blend-mode: screen;
                    animation: float 18s ease-in-out infinite alternate;
                    z-index: 0;
                }

                .blob-1 {
                    width: 420px;
                    height: 420px;
                    background: radial-gradient(circle, #22d3ee, #4f46e5);
                    top: -120px;
                    left: -80px;
                }

                .blob-2 {
                    width: 360px;
                    height: 360px;
                    background: radial-gradient(circle, #f97316, #ec4899);
                    top: 40%;
                    right: -140px;
                    animation-delay: -4s;
                }

                .blob-3 {
                    width: 380px;
                    height: 380px;
                    background: radial-gradient(circle, #22c55e, #06b6d4);
                    bottom: -160px;
                    left: 20%;
                    animation-delay: -8s;
                }

                .nav {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 18px;
                    border-radius: 999px;
                    background: rgba(15, 23, 42, 0.75);
                    border: 1px solid rgba(148, 163, 184, 0.25);
                    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(18px);
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .logo-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 999px;
                    background: radial-gradient(circle, #facc15, #f97316);
                    box-shadow: 0 0 20px rgba(250, 204, 21, 0.7);
                    font-size: 18px;
                }

                .logo-text {
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-size: 14px;
                }

                .nav-links {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }

                .nav-link {
                    background: transparent;
                    border: none;
                    color: #cbd5f5;
                    font-size: 14px;
                    padding: 6px 10px;
                    border-radius: 999px;
                    cursor: pointer;
                    transition: all 0.18s ease-out;
                    position: relative;
                }

                .nav-link::after {
                    content: "";
                    position: absolute;
                    left: 12px;
                    right: 12px;
                    bottom: -4px;
                    height: 2px;
                    border-radius: 999px;
                    background: linear-gradient(90deg, #a855f7, #22d3ee);
                    transform-origin: center;
                    transform: scaleX(0);
                    opacity: 0;
                    transition: all 0.18s ease-out;
                }

                .nav-link:hover {
                    color: #e5e7eb;
                    background: rgba(148, 163, 184, 0.08);
                }

                .nav-link:hover::after {
                    transform: scaleX(1);
                    opacity: 1;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .btn {
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    padding: 8px 16px;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: all 0.2s ease-out;
                    position: relative;
                    overflow: hidden;
                }

                .btn.primary {
                    background: linear-gradient(135deg, #4f46e5, #6366f1, #22d3ee);
                    color: white;
                    box-shadow: 0 12px 35px rgba(79, 70, 229, 0.7);
                }

                .btn.primary:hover {
                    transform: translateY(-1px) scale(1.01);
                    box-shadow: 0 18px 45px rgba(79, 70, 229, 0.9);
                }

                .btn.ghost {
                    background: transparent;
                    color: #e5e7eb;
                    border: 1px solid rgba(148, 163, 184, 0.4);
                }

                .btn.ghost:hover {
                    background: rgba(148, 163, 184, 0.12);
                }

                .btn.glass {
                    background: rgba(15, 23, 42, 0.7);
                    color: #e5e7eb;
                    border: 1px solid rgba(129, 140, 248, 0.5);
                    box-shadow: 0 0 40px rgba(56, 189, 248, 0.4);
                }

                .btn.glass:hover {
                    background: rgba(15, 23, 42, 0.9);
                    transform: translateY(-1px);
                }

                .btn.big {
                    padding: 10px 22px;
                    font-size: 15px;
                }

                .btn.glow::before {
                    content: "";
                    position: absolute;
                    inset: -30%;
                    background:
                        radial-gradient(circle at 20% 20%, #facc15, transparent),
                        radial-gradient(circle at 80% 0, #22d3ee, transparent),
                        radial-gradient(circle at 50% 100%, #a855f7, transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease-out;
                }

                .btn.glow:hover::before {
                    opacity: 0.65;
                }

                .hero {
                    position: relative;
                    z-index: 1;
                    margin-top: 48px;
                    display: grid;
                    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.1fr);
                    gap: 40px;
                    align-items: center;
                }

                .hero-left {
                    position: relative;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 10px 4px 4px;
                    border-radius: 999px;
                    background: rgba(15, 23, 42, 0.85);
                    border: 1px solid rgba(96, 165, 250, 0.7);
                    font-size: 12px;
                    color: #bfdbfe;
                    box-shadow: 0 0 28px rgba(56, 189, 248, 0.45);
                    margin-bottom: 18px;
                }

                .badge-dot {
                    width: 22px;
                    height: 22px;
                    border-radius: 999px;
                    background: conic-gradient(from 0deg, #22c55e, #22d3ee, #6366f1, #a855f7, #22c55e);
                    position: relative;
                }

                .badge-dot::after {
                    content: "";
                    position: absolute;
                    inset: 4px;
                    border-radius: inherit;
                    background: #020617;
                }

                .badge-text {
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                .hero-title {
                    font-size: 46px;
                    line-height: 1.06;
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    margin: 0 0 16px;
                }

                .gradient-text {
                    background: linear-gradient(120deg, #e5e7eb, #a5b4fc, #22d3ee);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: shimmer 8s ease-in-out infinite;
                }

                .underline {
                    position: relative;
                    display: inline-block;
                }

                .underline::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -5px;
                    height: 10px;
                    background: linear-gradient(90deg, #f97316, #ec4899);
                    border-radius: 999px;
                    opacity: 0.75;
                    filter: blur(3px);
                    z-index: -1;
                }

                .hero-subtitle {
                    max-width: 540px;
                    color: #9ca3af;
                    font-size: 15px;
                    line-height: 1.6;
                    margin-bottom: 24px;
                }

                .hero-actions {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 24px;
                }

                .hero-metrics {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                    padding-left: 4px;
                }

                .metric {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .metric-value {
                    font-size: 20px;
                    font-weight: 700;
                    color: #e5e7eb;
                }

                .metric-label {
                    font-size: 13px;
                    color: #9ca3af;
                }

                .hero-right {
                    position: relative;
                }

                .card {
                    position: relative;
                    border-radius: 24px;
                    background: radial-gradient(circle at top left, #111827, #020617);
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    padding: 16px 16px 18px;
                    box-shadow: 0 30px 80px rgba(15, 23, 42, 0.9);
                    overflow: hidden;
                }

                .main-card {
                    transform-origin: center;
                    animation: float-slow 16s ease-in-out infinite alternate;
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 16px;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 999px;
                }

                .dot.red {
                    background: #f97373;
                }
                .dot.yellow {
                    background: #facc15;
                }
                .dot.green {
                    background: #4ade80;
                }

                .card-title {
                    margin-left: auto;
                    font-size: 12px;
                    color: #9ca3af;
                }

                .timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 14px;
                }

                .timeline-item {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    gap: 10px;
                    align-items: center;
                    padding: 8px 10px;
                    border-radius: 14px;
                    background: rgba(15, 23, 42, 0.9);
                    border: 1px solid rgba(148, 163, 184, 0.3);
                }

                .timeline-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 999px;
                }

                .timeline-dot.blue {
                    background: radial-gradient(circle, #22d3ee, #3b82f6);
                }
                .timeline-dot.purple {
                    background: radial-gradient(circle, #a855f7, #6366f1);
                }
                .timeline-dot.green {
                    background: radial-gradient(circle, #4ade80, #22c55e);
                }

                .timeline-title {
                    font-size: 13px;
                    color: #e5e7eb;
                }

                .timeline-subtitle {
                    font-size: 11px;
                    color: #9ca3af;
                }

                .tag {
                    font-size: 11px;
                    padding: 4px 8px;
                    border-radius: 999px;
                    background: rgba(30, 64, 175, 0.2);
                    border: 1px solid rgba(59, 130, 246, 0.6);
                    color: #bfdbfe;
                }

                .tag.purple {
                    background: rgba(76, 29, 149, 0.4);
                    border-color: rgba(168, 85, 247, 0.7);
                    color: #e9d5ff;
                }

                .tag.green {
                    background: rgba(22, 163, 74, 0.3);
                    border-color: rgba(34, 197, 94, 0.8);
                    color: #bbf7d0;
                }

                .stats-row {
                    display: grid;
                    grid-template-columns: 1.1fr 1.2fr;
                    gap: 10px;
                }

                .mini-card {
                    border-radius: 18px;
                    background: radial-gradient(circle at top left, #020617, #020617);
                    border: 1px solid rgba(107, 114, 128, 0.6);
                    padding: 10px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .mini-label {
                    font-size: 11px;
                    color: #9ca3af;
                }

                .mini-value {
                    font-size: 14px;
                    color: #e5e7eb;
                    font-weight: 600;
                }

                .progress {
                    position: relative;
                    height: 6px;
                    border-radius: 999px;
                    background: rgba(31, 41, 55, 0.9);
                    overflow: hidden;
                }

                .progress-bar {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, #22c55e, #a3e635, #4ade80);
                    transform-origin: left;
                    animation: progress-pulse 4s ease-in-out infinite;
                }

                .pill-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .pill {
                    font-size: 11px;
                    padding: 4px 8px;
                    border-radius: 999px;
                    background: rgba(15, 23, 42, 0.8);
                    border: 1px solid rgba(148, 163, 184, 0.6);
                    color: #cbd5f5;
                }

                .pill.active {
                    background: radial-gradient(circle, #4f46e5, #22c55e);
                    border-color: transparent;
                    color: #e5e7eb;
                }

                .floating-card {
                    position: absolute;
                    border-radius: 18px;
                    padding: 10px 12px;
                    background: rgba(15, 23, 42, 0.9);
                    border: 1px solid rgba(129, 140, 248, 0.6);
                    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(20px);
                }

                .floating-card.flashcard {
                    top: -16px;
                    right: -4px;
                    width: 210px;
                    animation: float 13s ease-in-out infinite alternate;
                }

                .floating-card.streak {
                    bottom: 0;
                    left: -20px;
                    width: 230px;
                    animation: float 11s ease-in-out infinite alternate-reverse;
                }

                .floating-title {
                    font-size: 12px;
                    color: #c4b5fd;
                    margin-bottom: 6px;
                }

                .floating-content {
                    font-size: 12px;
                }

                .floating-label {
                    color: #9ca3af;
                    font-size: 11px;
                }

                .floating-question {
                    margin: 6px 0 10px;
                    color: #e5e7eb;
                }

                .pill-btn {
                    font-size: 12px;
                    padding: 6px 10px;
                    background: linear-gradient(120deg, #a855f7, #ec4899);
                    border: none;
                    color: #f9fafb;
                    border-radius: 999px;
                    cursor: pointer;
                }

                .streak-row {
                    display: flex;
                    gap: 6px;
                }

                .streak-dot {
                    flex: 1;
                    height: 44px;
                    border-radius: 999px;
                    background: rgba(15, 23, 42, 0.8);
                    border: 1px dashed rgba(148, 163, 184, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    color: #9ca3af;
                }

                .streak-dot-active {
                    background: radial-gradient(circle, #22c55e, #16a34a);
                    border-style: solid;
                    border-color: rgba(34, 197, 94, 0.9);
                    color: #e5e7eb;
                    box-shadow: 0 0 18px rgba(34, 197, 94, 0.9);
                }

                .bottom {
                    position: relative;
                    z-index: 1;
                    margin-top: 56px;
                }

                .bottom-card {
                    border-radius: 24px;
                    padding: 18px 22px;
                    background:
                        linear-gradient(120deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.86)),
                        radial-gradient(circle at top left, #4f46e5, transparent 55%),
                        radial-gradient(circle at bottom right, #22c55e, transparent 55%);
                    border: 1px solid rgba(129, 140, 248, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                .bottom-card h2 {
                    margin: 0 0 8px;
                    font-size: 20px;
                }

                .bottom-card p {
                    margin: 0;
                    font-size: 14px;
                    color: #9ca3af;
                    max-width: 520px;
                }

                /* Animations */
                @keyframes shimmer {
                    0% {
                        filter: hue-rotate(0deg);
                    }
                    50% {
                        filter: hue-rotate(30deg);
                    }
                    100% {
                        filter: hue-rotate(0deg);
                    }
                }

                @keyframes float {
                    0% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    100% {
                        transform: translate3d(10px, -20px, 0) scale(1.03);
                    }
                }

                @keyframes float-slow {
                    0% {
                        transform: translate3d(0, 0, 0) rotate(-1deg);
                    }
                    100% {
                        transform: translate3d(-8px, -16px, 0) rotate(1deg);
                    }
                }

                @keyframes progress-pulse {
                    0% {
                        transform: scaleX(0.5);
                    }
                    50% {
                        transform: scaleX(1);
                    }
                    100% {
                        transform: scaleX(0.6);
                    }
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .page {
                        padding: 18px 16px 24px;
                    }

                    .nav {
                        padding: 10px 12px;
                        border-radius: 20px;
                    }

                    .hero {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .hero-right {
                        margin-top: 28px;
                    }

                    .floating-card.flashcard {
                        right: 8px;
                    }

                    .floating-card.streak {
                        left: -6px;
                    }
                }

                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }

                    .hero-title {
                        font-size: 32px;
                    }

                    .hero-actions {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .hero-metrics {
                        gap: 14px;
                    }

                    .stats-row {
                        grid-template-columns: 1fr;
                    }

                    .main-card {
                        animation: none;
                    }

                    .floating-card {
                        position: static;
                        margin-top: 12px;
                    }

                    .bottom-card {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .blob {
                        opacity: 0.3;
                    }
                }
            `}</style>
        </>
    );
};

export default HomePage;
