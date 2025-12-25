const leaderBoardQueryKey = {
    all: ['users'] as const,
    point: () => [...leaderBoardQueryKey.all, 'points'] as const,
    streakday: () => [...leaderBoardQueryKey.all, 'streak-day'] as const,
};

export default leaderBoardQueryKey;