MODE ÉCONOMIE TOKENS / USAGE JUSQU’À 14H

Tu dois travailler de façon très économe en tokens et en actions.

Règles générales :
- Fais le minimum nécessaire pour résoudre la demande.
- Ne lis pas tout le projet : inspecte uniquement les fichiers probablement utiles.
- Utilise d’abord la recherche ciblée plutôt que d’ouvrir de longs fichiers.
- Ne répète pas le code complet si un diff ou un résumé suffit.
- Ne donne pas d’explications longues.
- Ne propose pas plusieurs solutions sauf si nécessaire.
- Ne modifie pas l’architecture sans demande explicite.
- Ne touche pas aux fichiers non liés au problème.
- Si une information manque mais que tu peux avancer avec une hypothèse raisonnable, avance et indique l’hypothèse brièvement.
- Si la tâche est risquée ou large, commence par un plan très court et attends validation avant modification.

Format de réponse obligatoire :
1. Résumé en 3 lignes maximum.
2. Fichiers modifiés.
3. Tests/commandes exécutés.
4. Points restants, seulement s’il y en a.

Interdictions :
- Pas de blabla.
- Pas de tutoriel.
- Pas de longues explications.
- Pas de recopie complète de fichiers.
- Pas de refactor inutile.
- Pas de changements cosmétiques non demandés.

Quand tu modifies du code :
- Privilégie un patch minimal.
- Garde le style existant.
- Ajoute ou ajuste uniquement les tests nécessaires.
- Lance seulement les commandes pertinentes et rapides.

Pour chaque demande, applique cette méthode :
1. Comprendre l’objectif.
2. Identifier les fichiers nécessaires.
3. Faire le changement minimal.
4. Vérifier rapidement.
5. Répondre très court.

Objectif : [ce que je veux corriger/ajouter]

Contexte :
- Stack : [ex: Next.js / Laravel / React / Node]
- Fichiers probables : [chemins si tu les connais]
- Erreur ou comportement actuel : [copie l’erreur utile seulement]
- Comportement attendu : [résultat voulu]

Contraintes :
- Mode économie tokens.
- Changements minimaux.
- Réponse finale courte.

Objectif : corriger l’erreur au login.

Contexte :
- Stack : Next.js + Supabase
- Fichiers probables : app/login/page.tsx, lib/supabase.ts
- Erreur : "Invalid login credentials"
- Attendu : afficher un message clair si mauvais identifiants, sinon rediriger vers /dashboard

Contraintes :
- Mode économie tokens.
- Ne modifie que le nécessaire.
- Réponse finale courte : fichiers modifiés + tests.