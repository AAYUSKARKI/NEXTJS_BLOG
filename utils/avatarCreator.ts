const avatarCreator = (username: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = '#2d3748'; // Dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '128px Arial';
        ctx.fillStyle = '#ffffff'; // White text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(username.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2);

        return canvas.toDataURL('image/png');
    }
    return '';
};