import { Theme, Target } from '../types/types';

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 240, height: 200 });

async function applyTheme(theme: Theme, target: Target) {
    console.log('apply-theme', theme, target);
}

// listen for messages from the UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'apply-theme') {
        await applyTheme(msg.message.theme, msg.message.target);
    }
};
