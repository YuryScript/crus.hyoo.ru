namespace $ {
	
	/** Hint how interpret inner Units: term, solo, vals, keys */
	export enum $hyoo_crus_gist_tag {
		/** Itself value. Ignore */
		term = 0b00,
		/** Value in first sub node. Ignore all after first */
		solo = 0b01,
		/** List of values */
		vals = 0b10,
		/** List of keys */
		keys = 0b11,
	}
	
	/**  (Meta) Data */
	export class $hyoo_crus_gist extends $hyoo_crus_unit {
		
		_vary = undefined as undefined | $hyoo_crus_vary_type
		_open = null as null | Uint8Array
		
		hint(
			tip = 'null' as keyof typeof $hyoo_crus_vary_tip,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			this.uint8( 0, ( $hyoo_crus_gist_tag[ tag ] << 1 )|( $hyoo_crus_vary_tip[ tip ] << 3 ) )
		}
		
		tag() {
			return $hyoo_crus_gist_tag[ ( this.uint8( 0 ) >> 1 ) & 0b11 ] as keyof typeof $hyoo_crus_gist_tag
		}
		
		tip() {
			return $hyoo_crus_vary_tip[ this.uint8( 0 ) >> 3 ] as keyof typeof $hyoo_crus_vary_tip
		}
		
		utf() {
			return Boolean( this.uint8( 0 ) & 0b10000000 )
		}
		
		nil() {
			return !this.uint16(0)
		}
		
		size( next?: number ) {
			return this.uint8( 1, next )
		}
		
		time( next?: number ) {
			return this.uint48( 8, next )
		}
		
		_self!: string
		self( next?: string ) {
			if( next === undefined && this._self !== undefined ) return this._self
			else return this._self = this.id6( 14, next )
		}
		
		_head!: string
		head( next?: string ) {
			if( next === undefined && this._head !== undefined ) return this._head
			else return this._head = this.id6( 20, next )
		}
		
		key(): string {
			return `${ this.head() }/${ this.self() }`
		}
		
		_lead!: string
		lead( next?: string ) {
			if( next === undefined && this._lead !== undefined ) return this._lead
			else return this._lead = this.id6( 26, next )
		}
		
		hash(
			next?: Uint8Array,
			tip = 'null' as keyof typeof $hyoo_crus_vary_tip,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			const bin = new Uint8Array( this.buffer, this.byteOffset + 32, 20 )
			if( next !== undefined ) {
				this.hint( tip, tag )
				this.size( 255 )
				bin.set( next )
			}
			if( this.size() > 32 ) return bin
			$mol_fail( new Error( 'No stored hash' ) )
		}
		
		meta() {
			return new Uint8Array( this.buffer, this.byteOffset + 42, 12 )
		}
		
		data(
			next?: Uint8Array,
			tip = 'null' as keyof typeof $hyoo_crus_vary_tip,
			tag = 'term' as keyof typeof $hyoo_crus_gist_tag,
		) {
			if( next === undefined ) {
				const size = this.size()
				if( size > 32 ) $mol_fail( new Error( 'Too long data' ) )
				return new Uint8Array( this.buffer, this.byteOffset + 32, size )
			} else {
				this.hint( tip, tag )
				if( next.byteLength > 32 ) $mol_fail( new Error( 'Too long data' ) )
				this.uint8( 1, next.byteLength )
				const bin = new Uint8Array( this.buffer, this.byteOffset + 32, next.byteLength )
				bin.set( next )
				new Uint8Array( this.buffer, this.byteOffset + 32 + next.length, 32 - next.length ).fill( 0 )
				return bin
			}
		}
		
		idea() {
			const bin = new Uint8Array( this.buffer, this.byteOffset + 20, 44 )
			const hash = $mol_crypto_hash( bin )
			const buf = new $mol_buffer( hash.buffer )
			return buf.uint48(0)
		}
		
		/**
		 * Compare gists on timeline ( right - left )
		 * Priority: time > peer > tick
		 */
		static compare(
			left: $hyoo_crus_gist,
			right: $hyoo_crus_gist,
		) {
			return ( Math.floor( right.time() / 65536 ) - Math.floor( left.time() / 65536 ) )
			|| ( right.peer() > left.peer() ? 1 : right.peer() < left.peer() ? -1 : 0 )
			|| ( right.time() - left.time() )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {},
				$mol_dev_format_native( this ),
				' ',
				this.peer(),
				' ',
				this.lead() || 'AAAAAAAA',
				$mol_dev_format_shade( '\\' ),
				$mol_dev_format_accent( this.head() || 'AAAAAAAA' ),
				$mol_dev_format_shade( '/' ),
				this.self() || 'AAAAAAAA',
				' ',
				$mol_dev_format_shade( new $mol_time_moment( this.time() ).toString( 'YYYY-MM-DD hh:mm:ss.sss' ) ),
				' ',
				{
					term: '💼',
					solo: '1️⃣',
					vals: '🎹',
					keys: '🔑',
				}[ this.tag() ],
				this.tip(),
				' ',
				$mol_dev_format_native( this._vary ) //??
					// ( this.size() > 32
					// 	? $mol_dev_format_shade( this.hash() )
					// 	: $mol_dev_format_native( $hyoo_crus_vary_decode({ tip: this.tip(), bin: this.data() }) )
					// ),
			)
		}
		
	}

}
