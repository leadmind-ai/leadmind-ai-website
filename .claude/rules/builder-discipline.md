# Discipline des builders

> Regle auto-chargee pour tous les teammates d'une equipe d'agents.

## Comparaison systematique avec les maquettes Stitch

Apres avoir implemente un composant UI, le builder DOIT :
1. Relire la maquette Stitch correspondante (dans `references/` ou Stitch MCP)
2. Verifier visuellement : couleurs, espacements, typographie, layout
3. Lister les ecarts dans son message de completion au lead

Ne pas declarer un composant termine sans cette verification.
Raison : Pattern observe — les alignements UI necessitent systematiquement un fix post-build (feedback-loop 2026-02-20, P4).

## Redemarrage backend apres modification

Quand un agent modifie du code backend (`app/backend/src/**`), il DOIT :
1. Relancer le serveur backend avant de tester
2. Verifier que les nouveaux endpoints sont accessibles

Ne pas lancer de tests E2E ou QA sur un backend stale.
Raison : Pattern observe — le backend ne recharge pas automatiquement, les tests echouent sur du code stale (feedback-loop 2026-02-20, P8).

## Nettoyage cross-fichier

Quand un builder implemente une feature qui remplace des mocks ou des TODO dans d'autres fichiers :
1. Chercher les TODO et mocks lies dans tout le projet (Grep)
2. Les supprimer ou les remplacer par le vrai code
3. Declarer les fichiers touches dans le message de completion

Raison : Pattern observe — des mocks stale restent dans le code apres que la vraie API existe (feedback-loop 2026-02-20, P2).
