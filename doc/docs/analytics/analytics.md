
# Analytics

:::note Version Beta

* Les tests sur les données remontées sont toujours en cours.
Merci de nous informer des problématiques que vous pourriez rencontrer.
* Les versions précédentes du DSFR sont en partie supportées.
Le périmètre de ce support sera détaillé dans de prochaines versions.
L’usage avec d’anciennes versions est livré “AS IS”.

:::

:::tip Nouveautés

* Support de IE11
* Support des SPA (Angular, React et Vue)
* Tous les composants implémentés
* Taux de click désactivé par défaut (économie de donnée) et activable via la configuration
* Opt out complet supporté
* id requis sur les éléments tracés, l’API remonte les id manquants dans la console

:::

Le système de design apporte avec lui un outil de collecte de données analytics basé sur la solution Eulérian. Ce
package, bien que fourni par le DSFR, peut être utilisé indépendamment de celui-ci via une version standalone.

Ce package est compatible à partir de la version dsfr-1.9.0, pour les versions précédentes l’ajout d'un patch permet un
support jusqu’à dsfr-1.3.0.

## Installation

Pour installer le système d’analytics, il suffit d’importer le fichier javascript :
`/dist/analytics/analytics.module.js` **après** `dsfr.module.js`

Le script d’Eulerian est automatiquement chargé au sein du package, attention à ne pas l’insérer dans la page afin
d'éviter les doublons.

⚠️ Pour les versions du dsfr inférieures à dsfr-1.9.0 (minimum 1.3.0), il est nécessaire d’ajouter le fichier : `/dist/patch/patch.module.js` **avant** `dsfr.module.js`

Analytics est un package à part, il n’est pas compris dans le fichier js global du dsfr.
Le package dispose tout de même d’une dépendance au DSFR, notamment au core.
Une version standalone des analytics permet d’utiliser ce package en dehors de toutes dépendances au DSFR.

## Configuration

Il est nécessaire de configurer le package Analytics au sein de [la configuration de l’API
DSFR](https://www.systeme-de-design.gouv.fr/comment-utiliser-le-dsfr/developpeurs/api-javascript)

La configuration doit être placée **avant** les fichiers `patch.module.js`, `dsfr.module.js` et `analytics.module.js`.

    <script>
        window.dsfr = {
            verbose: true,
            analytics: {
                domain: ' mon.domainedetracking.com',
                // collection: 'manual',
                // enableRating: true,
                page: {
                    template: 'article'
                },
                user: {
                    // ...
                },
                site: {
                    production: 'false',
                    entity: 'Ministère des armées', // Entity responsible for website
                }
            }
        };
    </script>

Utiliser le DSFR mode verbose permet d’afficher dans la console le résultat de la fonction collect(), montrant les
informations envoyées à Eulérian.

## class Analytics

L’instance d’Analytics est accessible depuis `window.dsfr.analytics`

### CONFIGURATION

    <script>
        window.dsfr = {
            analytics: {
                domain: 'mon.domainedetracking.com',
                // collection: 'manual',
                // enableRating: true
            }
        };
    </script>

##### domain :

_String_ (required)

Il est requis de définir la propriété `domain` avec le [domaine récupéré auprès d’Eulerian](https://eulerian.wiki/doku.php?id=fr:quickonboarding:installation:domain_implementation).

* * *

##### ~~mode~~ collection :

_String_

Défini le mode de récolte des données de la page :

* `manual` : Les données de pages ne sont pas envoyées. Attend l’execution de la fonction `collect()`.

* `load` : Les données de page sont envoyées automatiquement au chargement de la page. (par défaut)

* `full` : Les données sont envoyées à chaque changement de path dans l’URL, permettant le support des “Single-page
application” (par défaut si dsfr en mode ‘vue’, ‘react’ ou ‘angular’)

* `hash` : Les données sont envoyées à chaque changement de hash dans l'URL

* * *

##### enableRating :

_Boolean_

Permet d’activer le taux de click. (défaut: false)

* * *

### PROPRIÉTÉS

##### page :

_Page_

`window.dsfr.analytics.page`

Getter qui retourne l’instance de [Page](https://gouvfr.atlassian.net/wiki/spaces/DOC/pages/1151270968/Analytics+1.9.2#class-Page)

* * *

##### site :

_Site_

`window.dsfr.analytics.site`

Getter qui retourne l’instance de [Site](https://gouvfr.atlassian.net/wiki/spaces/DOC/pages/1151270968/Analytics+1.9.2#class-Site)

* * *

##### user :

_User_

`window.dsfr.analytics.user`

Getter qui retourne l’instance de [User](https://gouvfr.atlassian.net/wiki/spaces/DOC/pages/1151270968/Analytics+1.9.2#class-User)

* * *

##### cmp :

_ConsentManagerPlatform_

`window.dsfr.analytics.cmp`

Getter qui retourne l’instance de [ConsentManagerPlatform](https://gouvfr.atlassian.net/wiki/spaces/DOC/pages/1151270968/Analytics+1.9.2#class-ConsentManagerPlaform)

* * *

##### isReady :

_Boolean_

`window.dsfr.analytics.isReady`

Getter qui retourne l'état du package

* * *

##### readiness :

_Promise_

`window.dsfr.analytics.readiness`

Getter qui retourne une Promise permettant de se synchroniser sur le package

    window.dsfr.analytics.readiness.then(() => { // start }, () => { // error } );

* * *

##### isDebugging :

_Boolean_

`window.dsfr.analytics.isDebugging`

Permet d’activer / désactiver le debug Eulerian.

⚠️ le debug Eulerian reste persistant sur la page par le biais du LocalStorage jusqu'à désactivation.

* * *

### MÉTHODES

##### push (type, layer) :

`window.dsfr.analytics.push(type, layer)`

Alias de la fonction EA\_push d’Eulerian via le package. (voir doc Eulerian [https://eulerian.wiki/doku.php?id=fr:quickonboarding:installation:tag\_installation\_guide#types\_d\_appels](https://eulerian.wiki/doku.php?id=fr:quickonboarding:installation:tag_installation_guide#types_d_appels))

* * *

##### reset (clear = false) :

`window.dsfr.analytics.reset(clear)`

Permet de remettre les données dans l'état d’origine de la configuration.

Si le paramètre `clear = true` => toutes les données sont remises en état indéfini.

* * *

###### collect : {#collect}

`window.dsfr.analytics.collect()`

Envoie au collector le datalayer constitué par l’ensemble des données consolidées depuis :

* Page

* Site

* User


* * *

### USAGE

:::note 

Le package Analytics repose sur 2 principes de fonctionnement pour traquer les pages :
* Par le biais de la configuration, il est possible de définir toutes les données qui seront envoyées au chargement de la page (via le mode automatique)
* Par le biais de l’API, on peut définir toutes les données propriété par propriété pour ensuite envoyer l’ensemble
grâce à la méthode **collect**

:::

```javascript
dsfr.analytics.readiness.then(() => { // l'API analytics est prête à l'utilisation
    dsfr.analytics.isDebugging = true; // active le debugging eulerian
    dsfr.analytics.reset(); // remet les données à l'état de configuration
    dsfr.analytics.user.connect('USER\_ID', 'ENCRYPTED\_EMAIL', true);
    dsfr.analytics.page.path = 'my/virtual/page';
    dsfr.analytics.page.isError = true;
    dsfr.analytics.page.template = 'page404';
    dsfr.analytics.collect(); // envoie les données
});
```

## class Page

L’instance de Page est accessible depuis

window.dsfr.analytics.page

### CONFIGURATION

```javascript
<script>
    window.dsfr = {
        analytics: {
            page: {
                path: 'path\_name/from/url', // path for page tracking
                referrer: 'path\_name/ref/url/', // referrer for virtual pages (not for real page, eulerian automatically collects document.referrer)
                title: 'page title', // page title for virtual pages
                name: 'page name', // equivalent to title if not defined
                labels: \['label1', 'label2', 'label3', 'label4', 'label5'\],
                template: 'nom template', // page template
                group: 'group', // page group. if not defined, fallback to template value
                segment: 'segment', // site segment. if not defined, fallback to template value
                subtemplate: 'sous template', // page subtemplate
                theme: 'theme page', // page theme
                subtheme: 'sous theme', // page subtheme
                related: 'page liée', // related page id
                depth: 2, // page depth
                isError: true, // is this an error page (404, 500, 503...)
                current: 4, // In case of pagination, current page number
                total: 40, // In case of pagination, total pages number
                filters: \['actualités', 'Dossier de presse'\] // array of filters that were applied on the page (strings)
            },
        }
    };
</script>
```

### PROPRIÉTÉS

Les noms entre parenthèses (EA: …) correspondent au nom des variables restituées dans le datalayer et envoyées à Eulerian.

##### path :

_String_ (EA: path)

`window.dsfr.analytics.page.path`

* Défini le chemin de la page.

* Utilise `document.location.pathname` si non défini.


* * *

##### referrer :

_String_ (EA: referrer)

`window.dsfr.analytics.page.referrer`

* Défini la page précédente si différente de `document.referer` (si page virtuelle)


* * *

##### title :

_String_ (EA: page\_title)

`window.dsfr.analytics.page.title`

* Défini le titre de page si différent de la balise `title` de la page (si page virtuelle)


* * *

##### name :

_String_ (EA: page\_name)

`window.dsfr.analytics.page.name`

* Défini un nom de page (égal à title par défaut)


* * *

##### labels :

_Array`<String>`_ (EA: pagelabel)

`window.dsfr.analytics.page.labels`

* Liste de 5 regroupements de contenus maximum


* * *

##### categories :

_Array`<String>`_ (EA: page\_category1, page\_category2, page\_category1)

`window.dsfr.analytics.page.categories`

* Liste de 5 regroupements de contenus maximum

* Les 3 premiers labels servent à renseigner (EA: page\_category1), (EA: page\_category2), et (EA:
page\_category3)


* * *

##### template :

_String_ (EA: template)

`window.dsfr.analytics.page.template`

* Permet de définir un nom de template


* * *

##### group :

_String_ (EA: pagegroup)

`window.dsfr.analytics.page.group`

* Permet de définir un nom de groupe (par défaut égal à template)


* * *

##### segment :

_String_ (EA: segment-site)

`window.dsfr.analytics.page.segment`

* Permet de définir un nom de segment (par défaut égal à template)


* * *

##### subtemplate :

_String_ (EA: page\_subtemplate)

`window.dsfr.analytics.page.subtemplate`

Apporte un niveau de détail supplémentaire lié au contenu pour les page\_template comprenant beaucoup de pages
sur
des thèmes différents

* * *

##### theme :

_String_ (EA: page\_theme)

`window.dsfr.analytics.page.theme`

* Permet de définir le thème principal des contenus


* * *

##### subtheme :

_String_ (EA: page\_subtheme)

`window.dsfr.analytics.page.subtheme`

* Permet de définir un sous-theme


* * *

##### related :

_String_ (EA: page\_related)

`window.dsfr.analytics.page.related`

* Clé unique passée sur l'ensemble des pages avec des contenus liés


* * *

##### depth :

_Integer_ (EA: page\_depth)

`window.dsfr.analytics.page.depth`

Niveau de profondeur de la page (default: 0)

* * *

##### isError :

_Boolean_ (EA: error) \- default: false (required)

`window.dsfr.analytics.page.isError`

* Défini si la page est une page d’erreur (**obligatoire** si page d’erreur)


* * *

##### current :

_Integer_ (EA: page\_pagination)

`window.dsfr.analytics.page.current`

Numéro de page si au sein d’un découpage ou d’une pagination

* Récupération automatique depuis le composant Pagination (Implémentation à venir)


* * *

##### total :

_Integer_

`window.dsfr.analytics.page.total`

Nombre de page au sein du découpage ou de la pagination

Vient compléter la valeur envoyée à (EA: page\_pagination) si renseignée (valant : “current / total”)

* * *

##### filters :

* _Array`<String>`_ (EA: page\_filters)

`window.dsfr.analytics.page.filters`

Défini les filtres appliqués à la page

* * *

### MÉTHODES

##### reset (clear = false) :

`window.dsfr.analytics.page.reset(clear)`

Permet de remettre les données dans l'état d’origine de la configuration.

Si le paramètre `clear = true` => toutes les données sont remises en état indéfini.

* * *

## class User

L’instance de User est accessible depuis

window.dsfr.analytics.user

### CONFIGURATION

    <script>
        window.dsfr = {
            analytics: {
                user: {
                    connect: {
                        uid: '2446565', // user id - required when connected
                        email: 'rg6fgfdRfg445465dfFb', // encoded user email - required when connected
                        isNew: true, // user just registered
                    },
                    profile: 'visitor', // user profile
                    language: 'fr',
                    type: 'pro'
                },
            }
        };
    </script>

### PROPRIÉTÉS

Les noms entre parenthèses (EA: …) correspondent au nom des variables restituées dans le datalayer et envoyées à
Eulerian.

##### uid :

_String_ (EA: uid)

`window.dsfr.analytics.user.uid`

getter permettant de lire la valeur de l’uid

Voir la méthode [connect](#connect)

* * *

##### email :

_String_ (EA: email)

`window.dsfr.analytics.user.email`

getter permettant de lire la valeur de l’email

Voir la méthode [connect](#connect)

* * *

##### isNew :

_Boolean_ (EA: newcustomer)

`window.dsfr.analytics.user.isNew`

getter permettant de savoir s’il s’agit d’un nouvel utilisateur

Voir la méthode [connect](#connect)

* * *

##### status :

_String_ (EA: user\_login\_status)

`window.dsfr.analytics.user.status`

propriété définissant l'état de l’utilisateur entre ces différents status :

* `anonymous` (anonyme)

* `connected` (connecté)


Les différentes valeurs sont énumérées dans l’objet `window.dsfr.analytics.user.constructor.Status`

Voir la méthode [connect](#connect)

* * *

##### profile :

_String_ (EA: profile)

`window.dsfr.analytics.user.profile`

Défini la catégorie de profil de l’utilisateur. (En cours de définition)

* * *

##### language :

_String_ (EA: user\_language)

`window.dsfr.analytics.user.language`

langage de l’utilisateur au format ISO 639-1.

par défaut, langage du navigateur

* * *

##### type :

_String_ (EA: user\_type)

`window.dsfr.analytics.user.type`

Défini le type d’utilisateur parmi les valeurs suivantes :

* `professional` (pro)

* `individual` (part)


Les différentes valeurs sont énumérées dans l’objet `window.dsfr.analytics.user.constructor.Type`

* * *

### MÉTHODES

##### reset (clear = false) :

`window.dsfr.analytics.user.reset(clear)`

Permet de remettre les données dans l'état d’origine de la configuration.

Si le paramètre `clear = true` => toutes les données sont remises en état indéfini.

* * *

##### connect (uid, email, isNew = false) :

`window.dsfr.analytics.page.connect(uid, email, isNew)`

Permet de renseigner un utilisateur connecté

* `uid` : Ce paramètre doit être renseigné avec l'identifiant client de l'internaute que Eulérian utilise
comme
clé de recoupement pour consolider son historique de navigation quelque soit le device utilisé. Grâce à
l'ajout de
ce paramètre nous serons en mesure de reconstituer tous les leviers marketing activés depuis son mobile, sa
tablette et ses différents terminaux. En outre, ce paramètre nous permet de fournir des données plus fiables
pour
certaines métriques comme le visiteur unique ou la visite.Implémentation
Vous pouvez renseigner le paramètre chaque fois que l'internaute est loggé. Le uid n'a besoin d'être fourni
qu'une
fois par session mais rien ne vous empêche de le passer sur toutes les pages. (Pour rappel, vous pouvez nous
envoyer ne valeur vide).
**ATTENTION** : l'uid ne doit pas correspondre à un identifiant de session ou à un identifiant temporaire.
Il ne
peut pas être commun pour plusieurs internautes, ou différent pour le même internaute.

* `email` : Email de l'utilisateur hashé en SHA256

* `isNew` : dans le cas d'un utilisateur venant juste de s'enregistrer, passer la valeur du paramètre à true

l’action de connection change la valeur de la propriété `status` de la valeur `anonymous` à `connected`

* * *

## class Site

L’instance de Site est accessible depuis

window.dsfr.analytics.site

### CONFIGURATION

    <script>
        window.dsfr = {
            analytics: {
                site: {
                    environment: 'production', // by default development \['development', 'stage', 'production'\]
                    entity: 'Ministère des armées', // Entity responsible for website
                    language: '', // language of the website (ISO 639-1). default to html lang
                    target: 'target', // site target
                    type: 'type', // site type
                    region: 'FR-IDF', // region of the website (ISO 3166-2:FR)
                    department: 'FR-75', // department of the website (ISO 3166-2:FR)
                },
            }
        };
    </script>

### PROPRIÉTÉS

>Les noms entre parenthèses (EA: …) correspondent au nom des variables restituées dans le datalayer et envoyées à Eulerian.

**environment :

_String_ (EA: site\_environment)

`window.dsfr.analytics.site.environment`

Défini l’environnement du site parmi :

* `development` (dev) (default)

* `production` (prod)

* `stage`


Les différentes valeurs sont énumérées dans l’objet `window.dsfr.analytics.site.constructor.Environment`

* * *

##### entity :

_String_ (EA: site\_entity) (required)

`window.dsfr.analytics.site.entity`

Défini l'entité responsable du site **(obligatoire)**

* * *

##### language :

_String_ (EA: site\_language)

`window.dsfr.analytics.site.language`

Défini la langue du site en ISO 639-1

Par défaut, reprend l’attribut lang sur la balise `<html>` de la page

* * *

##### target :

_String_ (EA: site\_target)

`window.dsfr.analytics.site.target`

Défini l'objectif du site

* * *

##### type :

_String_ (EA: site\_type)

`window.dsfr.analytics.site.type`

Défini le type de site

* * *

##### region :

_String_ (EA: site\_region)

`window.dsfr.analytics.site.region`

Défini la région du site en ISO 3166-2:FR (pour les sites régionaux)

* * *

##### department :

_String_ (EA: site\_department)

`window.dsfr.analytics.site.department`

Défini le département du site (pour les sites départementaux)

* * *

### MÉTHODES

##### reset (clear = false) :

`window.dsfr.analytics.site.reset(clear)`

Permet de remettre les données dans l'état d’origine de la configuration.

Si le paramètre `clear = true` => toutes les données sont remises en état indéfini.

* * *

## class Search

L’instance de Search est accessible depuis

window.dsfr.analytics.search

### CONFIGURATION

    <script>
        window.dsfr = {
            analytics: {
                search: {
                    engine: 'principal',
                    results: 486,
                    terms: 'télécharger le cerfa 1234',
                    category: 'categorie',
                    theme: 'theme',
                    type: 'type',
                    method: ''
                },
            }
        };
    </script>

### PROPRIÉTÉS

Les noms entre parenthèses (EA: …) correspondent au nom des variables restituées dans le datalayer et envoyées à
Eulerian.

[paramètre supplémentaire]
indique qu’il s’agit d’un paramètre supplémentaire du moteur de recherche. L'ajout de cette nouvelle variable nécessite l'implémentation d'un couple de paramètres isearchkey et isearchdata, isearchkey contenant le nom du paramètre et isearchdata la valeur. On retrouve en sortie dans le datalayer 4 valeurs ['isearchkey', ‘PARAMETER\_NAME', ‘isearchdata’, 'PARAMETER\_VALUE’\]

##### engine :

_String_ (EA: isearchengine)

`window.dsfr.analytics.search.engine`

Nom du moteur de recherche configuré dans Eulerian.

* * *

##### results :

_Int_ (EA: isearchresults)

`window.dsfr.analytics.search.results`

Nombre de résultats sur une page de résultat suite à une recherche dans la barre de recherche.

* * *

##### terms :

_String_ (EA: isearchkey, search\_terms, isearchdata)
[paramètre supplémentaire]

`window.dsfr.analytics.search.terms`

Termes de la recherche.

* * *

##### category :

_String_ (EA: isearchkey, search\_category, isearchdata)
[paramètre supplémentaire]

`window.dsfr.analytics.search.category`

Catégorie de la recherche (lorsqu’un sélecteur de catégorie est disponible).

* * *

##### theme :

_String_ (EA: isearchkey, search\_theme, isearchdata)
[paramètre supplémentaire]

`window.dsfr.analytics.search.theme`

Thème de la recherche (lorsqu’un sélecteur de thème est disponible).

* * *

##### type :

_String_ (EA: isearchkey, search\_type, isearchdata)
[paramètre supplémentaire]

`window.dsfr.analytics.search.type`

Type de recherche si le moteur de recherche permet d’appliquer un type particulier (ex: uniquement
documents,
uniquement les 30 derniers jours)

* * *

##### method :

_String_ (EA: isearchkey, search\_method, isearchdata)
[paramètre supplémentaire]

`window.dsfr.analytics.search.method`

Défini la méthode de recherche utilisée, un envoi standard ou au clic sur une suggestion.

* _standard_

* _autocomplete_


* * *

### MÉTHODES

##### reset (clear = false) :

`window.dsfr.analytics.search.reset(clear)`

Permet de remettre les données dans l'état d’origine de la configuration.

Si le paramètre `clear = true` => toutes les données sont remises en état indéfini.

* * *

## class Funnel

L’instance de Funnel est accessible depuis

window.dsfr.analytics.funnel

### CONFIGURATION

    <script>
        window.dsfr = {
            analytics: {
                funnel: {
                    id: 'id',
                    type: 'type',
                    name: 'name',
                    step: 'step', // step name
                    current: 2, // step number
                    total: 7, // total number of steps
                    objective: 'objective', // form objective
                    error: 'email' // form's error type
                }
            }
        };
    </script>

### PROPRIÉTÉS

Les noms entre parenthèses (EA: …) correspondent au nom des variables restituées dans le datalayer et envoyées à
Eulerian.

##### id :

_String_ (EA: funnel\_id)

`window.dsfr.analytics.funnel.id`

Identifiant du parcours / formulaire multi-étape

* * *

##### type :

_String_ (EA: funnel\_type)

`window.dsfr.analytics.funnel.type`

Type de parcours / formulaire

* * *

##### name :

_String_ (EA: funnel\_name)

`window.dsfr.analytics.funnel.name`

Nom du parcours/formulaire si besoin de précision.

* * *

##### step :

_String_ (EA: funnel\_step\_name)

`window.dsfr.analytics.funnel.step`

Nom de l'étape du parcours/formulaire.

* * *

##### current :

_Int_ (EA: funnel\_step\_number)

`window.dsfr.analytics.funnel.current`

Numéro de l'étape en cours dans le parcours/formulaire.

* * *

##### total :

_Int_ (EA: funnel\_step\_max)

`window.dsfr.analytics.funnel.total`

Nombre d’étapes maximum dans le parcours/formulaire.

* * *

##### objective :

_String_ (EA: funnel\_objective)

`window.dsfr.analytics.funnel.objective`

Objectif du parcours/formulaire.

* * *

##### error :

_String_ (EA: funnel\_error)

`window.dsfr.analytics.funnel.error`

Type d’erreur d’un parcours/formulaire.

* * *

### MÉTHODES

##### reset (clear = false) :

`window.dsfr.analytics.funnel.reset(clear)`

Permet de remettre les données dans l'état d’origine de la configuration.

Si le paramètre `clear = true` => toutes les données sont remises en état indéfini.

* * *

## class ConsentManagerPlatform

L’instance de ConsentManagerPlatform est accessible depuis

window.dsfr.analytics.cmp

### CONFIGURATION

    <script>
        window.dsfr = {
            analytics: {
                cmp: {
                id: 'tarteaucitron'
                },
            }
        };
    </script>

la configuration d’une cmp permet d’automatiser son lancement

### MÉTHODES

##### integrateTarteAuCitron () :

`window.dsfr.analytics.cmp.integrateTarteAuCitron()`

Permet d’intégrer tarteaucitron

équivalent de la première étape décrite [dans la documentation
Eulerian](https://eulerian.wiki/doku.php?id=fr:quickonboarding:installation:cmp#tarteaucitron)

* * *

## Actions hors composant {#custom-action}

Il est possible de remonter à Eulérian des actions effectuées sur des éléments HTML hors composants du DSFR.

Pour ajouter un écouteur d'événement il suffit d’ajouter un attribut `data-fr-analytics-{action}` sur la
balise
HTML concernée.

Il existe les actions suivantes :

##### click :

`data-fr-analytics-click`

Mode : [out] | type : _interaction_

Interaction générique du clic.

L’action click renverra automatiquement l’action ‘internal', ‘external’, ‘download’, ou par défaut 'click’,
en fonction des attributs de l'élément (href, download)

* * *

##### internal :

`data-fr-analytics-internal`

Mode : [out] | type : _interaction_

Clique vers un lien interne, une ancre.
⚠️ _Sauf cas spécifique, préférez l’utilisation de ‘click’_

* * *

##### external :

`data-fr-analytics-external`

Mode : [out] | type : _interaction_

Clique vers un lien externe.
⚠️ _Sauf cas spécifique, préférez l’utilisation de ‘click’_

* * *

##### download :

`data-fr-analytics-download`

Mode : [out] | type : _interaction_

Clique sur un lien téléchargeable.
⚠️ _Sauf cas spécifique, préférez l’utilisation de ‘click’_

* * *

##### double-click :

`data-fr-analytics-dblclick`

Mode : [out] | type : _interaction_

Interaction générique du double-clic.

* * *

##### change :

`data-fr-analytics-change`

Mode : [out] | type : _event_

Événement au changement d'état (ex: select).

* * *

### Exemples d’ajout d’une action

```html
<p>Envoyez un événement lors du clic sur
  <span data-fr-analytics-click="label à remonter">ce texte</span>.
</p>
```

```html
<p>
Envoyez un événement lors du clic sur
<a href="http://url-externe" data-fr-analytics-click>ce lien externe</span>.
</p>
```

## Actions sur les composants DSFR

Les composants du DSFR envoient automatiquement des actions prédéfinies, aucune action supplémentaire n’est
nécessaire pour ces actions.

Ce tableau regroupe les différentes actions remontées à Eulérian pour chaque composant du DSFR :

**Composant**

**Elément**

**Type** [breakpoint]

**Valeur**

**Label**

**Taux**
**de click**

dsfr\_accordion

fr-collapse

DISCLOSE

Titre de l’accordéon ou intitulé du bouton

✅

fr-accordion\_\_btn

CLICK

Libellé du bouton

dsfr\_alert

fr-alert

IMPRESSION

Titre de l’alerte

dsfr\_badge

fr-badge

IMPRESSION

Libellé du badge

dsfr\_breadcrumb

fr-collapse

IMPRESSION [MD]
[LG]
[xl]

fil d’ariane

fr-collapse

DISCLOSE[xs]
[sm]

fil d’ariane

fr-breadcrumb\_\_button

CLICK
[xs]
[sm]

Libellé du bouton

fr-breadcrumb\_\_link

CLICK

href

Libellé du lien

dsfr\_button

fr-btn

CLICK

Libellé du bouton

✅

dsfr\_callout

fr-callout

IMPRESSION

Titre de la mise en avant ou `Mise en avant`

dsfr\_card

fr-card

IMPRESSION
(sans lien)

Titre de la carte

fr-card\_\_title a

CLICK

href

Lien de la carte

✅

dsfr\_checkbox

fr-checkbox-group \[type="checkbox"\]

CHECK

input\_value

Libellé du champ sélectionné

✅

fr-checkbox-group \[type="checkbox"\]

UNCHECK

input\_value

Libellé du champ désélectionné

✅

dsfr\_connect

fr-connect

CLICK

“FranceConnect”

✅

fr-connect--plus

CLICK

“FranceConnect+”

✅

fr-connect + \* a

CLICK

“Qu'est-ce que FranceConnect ?”

dsfr\_consent

fr-consent-banner

NULL

“Gestionnaire de consentement”

dsfr\_content

fr-content-media

IMPRESSION

`aria-label` du block fr-content-media ou
`alt` ou `aria-label` de l'image ou
`title` ou `aria-label` de la video

dsfr\_follow

fr-follow\_\_newsletter fr-input-group fr-input,
fr-follow\_\_newsletter fr-input-group fr-btn

SUBSCRIBE

“component\_value”: input\_value

“Lettre d'information et Réseaux Sociaux”

✅

dsfr\_footer

fr-footer

IMPRESSION

Pied de page

fr-footer\_\_content-link,
fr-footer\_\_bottom-link,
fr-footer\_\_top-link,
fr-footer\_\_partners-link

CLICK

href

Libellé du lien

dsfr\_header

fr-header

IMPRESSION

En-tête

fr-header\_\_tools-links fr-btns-group fr-btn

CLICK
[LG]
[xl]

href

Libellé du bouton d’accès rapide

fr-header\_\_menu-links fr-btns-group fr-btn

CLICK
[xs]
[sm]
[MD]

href

Libellé du bouton d’accès rapide

fr-header\_\_menu fr-modal,
fr-header\_\_search fr-modal

DISCLOSE
[xs]
[sm]
[MD]

menu
rechercher

dsfr\_highlight

fr-highlight

IMPRESSION

Mise en exergue

dsfr\_input

fr-input-group

IMPRESSION

input value

Libéllé du label

dsfr\_link

fr-link

CLICK

href

Libellé du lien

✅

fr-link\[href\]

INTERNAL si lien interne, EXTERNAL si lien externe (déterminé par le href)

href

Libellé du lien

✅

fr-link\[download\]

DOWNLOAD

Libellé du lien de téléchargement

✅

dsfr\_modal

fr-modal

DISCLOSE

Titre de la modale

✅

dsfr\_navigation

fr-nav\_\_link

CLICK

href

Libellé du lien

dsfr\_notice

fr-notice

IMPRESSION

Titre du bandeau d’information importante `fr-notice__title`

dsfr\_pagination

fr-pagination\_\_link

CLICK

Libellé du lien de pagination

dsfr\_quote

fr-quote

IMPRESSION

Contenu de la citation (35 premiers caractères)

dsfr\_radio

fr-radio-group \[type="radio"\]

CHECK

legende du fieldset > Libellé du champ selectionné

✅

dsfr\_search

fr-search-bar fr-input

SEARCH

“component\_value”: input\_value

“barre de recherche”

✅

fr-search-bar fr-btn

SEARCH

“component\_value”: input\_value

“barre de recherche”

✅

dsfr\_select

fr-select-group

CHANGE

“component\_value”: select\_value

Libellé du `fr_label`

✅

dsfr\_share

fr-share

IMPRESSION

Libellé du titre `share__title` ou “Boutons de partage”

✅

dsfr\_sidemenu

fr-sidemenu\_\_link

CLICK

href

Arborescence du lien

dsfr\_stepper

fr-stepper

IMPRESSION

“Indicateur d'étapes”

dsfr\_summary

fr-summary\_\_link

CLICK

href

Arborescence du lien

dsfr\_tab

fr-tab

DISCLOSE

Libellé du tab button

✅

\[aria-controls=IdTab\]

CLICK

Libellé du tab button

dsfr\_table

fr-table

IMPRESSION

Caption du tableau

dsfr\_tag

fr-tag

IMPRESSION

Libellé du tag

a.fr-tag, button.fr-tag

CLICK

Libellé du tag cliquable

✅

fr-tag--dismiss

DISMISS

Libellé du tag supprimable

✅

fr-tag\[aria-pressed='false'\]

PRESS

Libellé du tag pressable

✅

fr-tag\[aria-pressed='true'\]

RELEASE

Libellé du tag pressable

✅

dsfr\_tile

fr-tile

IMPRESSION

titre de la tuile

fr-tile fr-tile\_\_link

CLICK

href

titre de la tuile `fr-tile__title`

✅

dsfr\_toggle

fr-toggle \[type="checkbox"\]

CHECK

Libellé du champ sélectionné

✅

fr-toggle \[type="checkbox"\]

UNCHECK

Libellé du champ désélectionné

✅

dsfr\_transcription

fr-transcription fr-collapse

DISCLOSE

Titre de la transcription `'fr-transcription__title`' ou libellé du bouton

✅

fr-transcription\_\_btn

CLICK

Libellé du bouton

dsfr\_upload

fr-upload

IMPRESSION

“component\_value”: input\_value

Libellé du `fr-label` ou "Ajout de fichier"

✅

Il reste possible d’ajouter plus d’actions à remonter, en utilisant les attributs utilitaires
`data-fr-analytics-{action}` sur un élément HTML d’un composant (voir : [Actions hors composant](#custom-action)).