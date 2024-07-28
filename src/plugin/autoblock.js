import config from '../../config.cjs';

const autoblockCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

  if (cmd === 'autoblock') {
    if (!isCreator) return m.reply("*_THIS IS AN OWNER COMMAND_*⛔");
    let responseMessage;

    if (text === 'on') {
      config.AUTO_BLOCK = true;
      responseMessage = "*_Auto-Block has been enabled._*";
    } else if (text === 'off') {
      config.AUTO_BLOCK = false;
      responseMessage = "*_Auto-Block has been disabled._*";
    } else {
      responseMessage = "Usage:\n- `autoblock on`: Enable Auto-Block\n- `autoblock off`: Disable Auto-Block";
    }
    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autoblockCommand;
