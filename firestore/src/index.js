

module.exports = class FirebaseHelper {
    constructor({ DB }) {
        this.DB = DB;
    }

    collection(ref) {
        const { DB } = this;
        if (typeof ref === 'string') {
            return DB.collection(ref);
        }
        // TODO: ref instanceOf FirestoreCollection
        return ref;
    }

    doc(ref) {
        const { DB } = this;
        if (typeof ref === 'string') {
            return DB.doc(ref);
        }
        // TODO: ref instanceOf FirestoreDocument
        return ref;
    }

    makeRef(ref, type) {
        // TODO: smarter ref instanceOf?
        if (!ref || !ref.path || !ref.get) {
        }
        return ref;
    }

    list(ref, skip, limit) {
        let ref = this.collection(ref);
        let snap = await ref.get();
        return snap.docs.map(s => s.data());
    }

    get(ref) {
        let ref = this.collection(ref);
        let snap = await ref.get();
        if (!snap.exists) {
            return false;
        }
        return snap.data();
    }

    create(ref) {

    }

    delete(ref) {

    }

    patch(ref) {

    }
}