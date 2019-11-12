import { ulid } from 'ulid'

export function ulidlc(seedTime) {
    return ulid(seedTime).toLowerCase();
}
