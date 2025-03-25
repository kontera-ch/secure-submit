<template>
  <div class="pt-10">
    <div>
      <h3>👋</h3>

      <p>
        Du wurdest vom Kontera Team dazu gebeten, ein Passwort, ein API-Key oder einen geheimen Schlüssel zu verschlüsseln. Bitte gib den Text ein, der verschlüsselt werden soll.
        Der Inhalt wird mittels unserem öffentlichen PGP Key verschlüsselt.
      </p>

      <label for="file">Nachricht / API-Key / Secret</label>
      <textarea class="form-control" v-model="message" type="text" />

      <div class="py-4">
        <button class="btn btn-success text-white" @click="encryptSecret">🔒 Verschlüsseln</button>
      </div>

      <label for="file">Verschlüsselte Nachricht (sende uns diesen Inhalt)</label>
      <textarea class="form-control" v-model="messageEncrypted" />

      <hr class="mt-10" />

      <a @click="showDecryptionZone = true">Entschlüsseln via PGP Private Key</a>

      <div v-if="showDecryptionZone">
        <label for="file">Encrypted Message</label>
        <textarea class="form-control" v-model="messageToDecrypt" type="text" />

        <label for="file">PGP Private Key</label>
        <textarea class="form-control" v-model="pgpPrivateKey" type="text" />

        <div class="my-4">
          <button class="btn btn-success text-white" @click="decryptSecret">🔓 Entschlüsseln</button>
        </div>

        <pre>
          <textarea class="form-control" v-model="decryptedMessage" />
      </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { readKey, createMessage, encrypt, decrypt, readMessage, decryptKey, readPrivateKey } from 'openpgp';

// put keys in backtick (``) to avoid errors caused by spaces or tabs
const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
eqzgK4XsLxrAKv4=
=BKfn
-----END PGP PUBLIC KEY BLOCK-----
`;

export default defineComponent({
  setup() {
    const showDecryptionZone = ref(false)
    const message = ref('');
    const messageEncrypted = ref('');

    const pgpPrivateKey = ref('');
    const messageToDecrypt = ref('');
    const decryptedMessage = ref('');

    const encryptSecret = async () => {
      const publicKey = await readKey({ armoredKey: publicKeyArmored });

      const encrypted = await encrypt({
        message: await createMessage({ text: message.value }), // input as Message object
        encryptionKeys: publicKey
      });

      messageEncrypted.value = encrypted;
    };

    const decryptSecret = async () => {
      const publicKey = await readKey({ armoredKey: publicKeyArmored });
      const privateKey = await readPrivateKey({ armoredKey: pgpPrivateKey.value });

      const message = await readMessage({
        armoredMessage: messageToDecrypt.value // parse armored message
      });

      const { data: decrypted } = await decrypt({
        message,
        verificationKeys: publicKey,
        decryptionKeys: privateKey
      });

      decryptedMessage.value = decrypted;
    };

    return {
      showDecryptionZone,
      decryptedMessage,
      message,
      messageEncrypted,
      messageToDecrypt,
      pgpPrivateKey,

      encryptSecret,
      decryptSecret
    };
  }
});
</script>
