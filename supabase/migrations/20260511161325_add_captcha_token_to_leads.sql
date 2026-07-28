/*
  # Ajout du jeton reCAPTCHA aux leads

  1. Modifications
    - Ajoute la colonne `captcha_token` (text, nullable) à la table `leads` pour stocker
      le jeton reCAPTCHA v3 soumis lors de l'envoi du formulaire. Ce jeton peut ensuite
      être vérifié côté serveur (par une edge function ou un trigger) via l'API Google.

  2. Sécurité
    - Aucune modification des politiques RLS existantes.
    - La colonne est en lecture/écriture pour les mêmes rôles que le reste de la table.

  3. Notes
    - Le jeton est nullable pour rester rétrocompatible avec les insertions existantes
      au cas où la clé publique reCAPTCHA ne serait pas encore configurée.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'captcha_token'
  ) THEN
    ALTER TABLE leads ADD COLUMN captcha_token text;
  END IF;
END $$;
