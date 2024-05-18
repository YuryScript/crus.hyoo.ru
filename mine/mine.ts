namespace $ {
	/** Units/Rocks storage */
	export class $hyoo_crus_mine extends $mol_object {
		
		/** SHA-1 hash of large info */
		@ $mol_mem_key
		static hash( blob: Uint8Array ) {
			return $mol_crypto_hash( blob )
		}
		
		/**  BLOB identified by Hash */
		@ $mol_mem_key
		static rock( hash: Uint8Array, next?: Uint8Array ): Uint8Array | null {
			$mol_wire_solid()
			return next ?? null
		}
		
		@ $mol_action
		static save( blob: Uint8Array ) {
			const hash = this.hash( blob )
			this.rock( hash, blob )
			return hash
		}
		
	}
}
