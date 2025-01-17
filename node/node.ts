namespace $ {
	
	/** Virtual Node that represents contained units as high-level data types. */
	export class $hyoo_crus_node extends $mol_object {
		
		static tag: keyof typeof $hyoo_crus_sand_tag = 'vals'
		
		/** Standalone part of Realm which syncs separately, have own rights, and contains Units */
		land() {
			return null as any as $hyoo_crus_land
		}
		
		/** Land local Node id */
		head() {
			return ''
		}
		
		/** Reference to Land/Lord. */
		land_ref() {
			return this.land()?.ref() ?? this.$.$hyoo_crus_auth.current().lord()
		}
		
		/** Reference to Node/Land/Lord. */
		@ $mol_memo.method
		ref() {
			return $hyoo_crus_ref( this.land_ref().description + '_' + this.head() )
		}
		
		toJSON() {
			return this.ref().description
		}
		
		/** Returns another representation of this node. */
		@ $mol_mem_key
		cast< Node extends typeof $hyoo_crus_node >( Node: Node ): InstanceType< Node > {
			return this.land().Node( Node ).Item( this.head() )
		}
		
		/** Ordered inner alive Node. */
		@ $mol_mem_key
		nodes< Node extends typeof $hyoo_crus_node >( Node: Node | null ): readonly InstanceType< Node >[] {
			const land = this.land()
			const map = {
				term: ()=> land.Node( Node || $hyoo_crus_atom_vary ),
				solo: ()=> land.Node( Node || $hyoo_crus_atom_vary ),
				vals: ()=> land.Node( Node || $hyoo_crus_list_vary ),
				keys: ()=> land.Node( Node || $hyoo_crus_dict ),
			}
			return this.units().map( unit => map[ unit.tag() ]().Item( unit.self() ) ) as any
		}
		
		/** All ordered alive Units */
		@ $mol_mem
		units() {
			return this.land().sand_ordered( this.head() ).filter( unit => unit.tip() !== 'nil' )
		}
		
		filled() {
			return this.units().length > 0
		}
		
		/** Ability to make changes inside Land */
		can_change( lord = this.land().auth().lord() ) {
			return this.land().lord_rank( lord ) >= $hyoo_crus_rank.add
		}
		
		/** Time of last changed unit inside Node subtree */
		@ $mol_mem
		last_change() {
			
			const land = this.land()
			let last = 0
			
			const map = {
				term: ()=> null,
				solo: ()=> land.Node( $hyoo_crus_atom_vary ),
				vals: ()=> land.Node( $hyoo_crus_list_vary ),
				keys: ()=> land.Node( $hyoo_crus_dict ),
			}
			
			const visit = ( sand: $hyoo_crus_sand )=> {
				if( sand.time() > last ) last = sand.time()
				map[ sand.tag() ]()?.Item( sand.self() ).units().forEach( visit )
			}
			for( const sand of this.units() ) visit( sand )
			
			return last ? new $mol_time_moment( last ) : null
			
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
			)
		}
		
	}

}
