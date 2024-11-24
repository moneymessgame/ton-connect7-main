export const fetchReferralsData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invitation?userId=DEFAULT_USER_ID`);
    if (!response.ok) {
      throw new Error('Failed to fetch referrals');
    }
    const data = await response.json();
    const referrals = data.map((item: any) => ({
      firstName: item.invitee?.firstName || null,
      lastName: item.invitee?.lastName || null,
      username: item.invitee?.username || null,
      photoUrl: item.invitee?.photoUrl || null,
      invitee: {
        username: item.invitee?.username || null,
      },
    }));
    return referrals;
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return null;
  }
};
