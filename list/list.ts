namespace $ {

	/** Reactive convergent list. */
	export class $hyoo_crus_list_vary extends $hyoo_crus_node {
		
		static tag = $hyoo_crus_sand_tag[ $hyoo_crus_sand_tag.vals ] as keyof typeof $hyoo_crus_sand_tag
		
		/** All Vary in the list. */
		@ $mol_mem
		items_vary(
			next?: readonly $hyoo_crus_vary_type[],
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		): readonly $hyoo_crus_vary_type[] {
			
			const units = this.units()
			if( next === undefined ) return units.map( unit => this.land().sand_decode( unit ) )
			
			this.splice( next, 0, units.length, tag )
			return this.items_vary()
			
		}
		
		/** Replace sublist by  new one with reconciliation. */
		splice(
			next: readonly $hyoo_crus_vary_type[],
			from = this.units().length,
			to = from,
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			const land = this.land()
			$mol_reconcile({
				prev: this.units(),
				from,
				to,
				next,
				equal: ( next, prev )=> $mol_compare_deep( this.land().sand_decode( prev ), next ),
				drop: ( prev, lead )=> this.land().post( lead?.self() ?? '', prev.head(), prev.self(), null ),
				insert: ( next, lead )=> this.land().post( lead?.self() ?? '', this.head(), land.self_make(), next, tag ),
				update: ( next, prev, lead )=> this.land().post( lead?.self() ?? '', prev.head(), prev.self(), next, prev.tag() ),
			})
		}
		
		/** Unit by Vary. */
		find( vary: $hyoo_crus_vary_type ) {
			for( const unit of this.units() ) {
				if( $mol_compare_deep( this.land().sand_decode( unit ), vary ) ) return unit
			}
			return null
		}
		
		/** Existence of Vary in the list. */
		has(
			vary: $hyoo_crus_vary_type,
			next?: boolean,
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			if( next === undefined ) return Boolean( this.find( vary ) )
			if( next ) this.add( vary, tag )
			else this.cut( vary )
			return next
		}
		
		/** Add Vary a the beginning if it doesn't exists. */
		add(
			vary: $hyoo_crus_vary_type,
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			if( this.has( vary ) ) return
			this.land().post( '', this.head(), '', vary, tag )
		}
		
		/** Removes all Vary presence. */
		cut( vary: $hyoo_crus_vary_type ) {
			
			const units = [ ... this.units() ]
			for( let i = 0; i < units.length; ++ i ) {
				
				if( ! $mol_compare_deep( this.land().sand_decode( units[i] ), vary ) ) continue
				
				this.land().post(
					units[i-1]?.self() ?? 0,
					units[i].head(),
					units[i].self(),
					null,
				)
				
				units.splice( i, 1 )
				-- i
				
			}
			
		}
		
		/** Moves item from one Seat to another. */
		move( from: number, to: number ) {
			this.land().sand_move( this.units()[ from ], this.head(), to )
		}
		
		/** Remove item by Seat. */
		wipe( seat: number ) {
			this.land().sand_wipe( this.units()[ seat ] )
		}
		
		/** Add vary at the end and use maked Self as Node Head. */
		node_make< Node extends typeof $hyoo_crus_node >(
			Node: Node,
			vary: $hyoo_crus_vary_type,
			tag: keyof typeof $hyoo_crus_sand_tag = 'term',
		) {
			this.splice( [ vary ], undefined, undefined, tag )
			return this.land().Node( Node ).Item( this.units().at(-1)!.self() )
		}
		
		;[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.head(),
				' ',
				$mol_dev_format_auto( this.items_vary() ),
			)
		}
		
	}

	/** Mergeable list of atomic vary type factory */
	export function $hyoo_crus_list<
		Parse extends $mol_data_value
	>( parse: Parse ) {

		abstract class Narrow extends $hyoo_crus_list_vary {

			static parse = parse;

			@ $mol_mem
			items( next?: readonly ReturnType< Parse >[] ): readonly ReturnType< Parse >[] {
				return this.items_vary( next?.map( parse ) ).map( parse )
			}

		}

		return Narrow
	}

	/** Mergeable list of atomic non empty binaries */
	export class $hyoo_crus_list_bin extends $hyoo_crus_list( $hyoo_crus_vary_cast_bin ) {}
	/** Mergeable list of atomic booleans */
	export class $hyoo_crus_list_bool extends $hyoo_crus_list( $hyoo_crus_vary_cast_bool ) {}
	/** Mergeable list of atomic int64s */
	export class $hyoo_crus_list_int extends $hyoo_crus_list( $hyoo_crus_vary_cast_int ) {}
	/** Mergeable list of atomic float64s */
	export class $hyoo_crus_list_real extends $hyoo_crus_list( $hyoo_crus_vary_cast_real ) {}
	/** Mergeable list of atomic some references */
	export class $hyoo_crus_list_ref extends $hyoo_crus_list( $hyoo_crus_vary_cast_ref ) {}

	/** Mergeable list of atomic strings */
	export class $hyoo_crus_list_str extends $hyoo_crus_list( $hyoo_crus_vary_cast_str ) {}
	/** Mergeable list of atomic iso8601 time moments */
	export class $hyoo_crus_list_time extends $hyoo_crus_list( $hyoo_crus_vary_cast_time ) {}
	/** Mergeable list of atomic iso8601 time durations */
	export class $hyoo_crus_list_dur extends $hyoo_crus_list( $hyoo_crus_vary_cast_dur ) {}
	/** Mergeable list of atomic iso8601 time intervals */
	export class $hyoo_crus_list_range extends $hyoo_crus_list( $hyoo_crus_vary_cast_range ) {}
	/** Mergeable list of atomic plain old js objects */
	export class $hyoo_crus_list_json extends $hyoo_crus_list( $hyoo_crus_vary_cast_json ) {}
	/** Mergeable list of atomic plain old js arrays */
	export class $hyoo_crus_list_jsan extends $hyoo_crus_list( $hyoo_crus_vary_cast_jsan ) {}
	/** Mergeable list of atomic DOMs */
	export class $hyoo_crus_list_dom extends $hyoo_crus_list( $hyoo_crus_vary_cast_dom ) {}
	/** Mergeable list of atomic Trees*/
	export class $hyoo_crus_list_tree extends $hyoo_crus_list( $hyoo_crus_vary_cast_tree ) {}

	export class $hyoo_crus_list_ref_base extends $hyoo_crus_list_ref {
	}
	
	/** mergeable list of atomic references to some Node type */
	export function $hyoo_crus_list_ref_to<
		const Value extends any,
		Vals extends readonly any[] = readonly $mol_type_result< $mol_type_result< Value > >[]
	>( Value: Value ) {
		
		class Ref extends $hyoo_crus_list_ref_base {
			
			static Value = Value
			
			static toJSON() {
				return '$hyoo_crus_list_to<' + ( Value as any )() + '>'
			}
			
			/** List of referenced Nodes */
			@ $mol_mem
			remote_list( next?: Vals ) {
				const realm = this.$.$hyoo_crus_realm
				const Node = ( Value as any )()
				return this.items_vary( next?.map( item => ( item as $hyoo_crus_node ).ref() ) )
					.map( $hyoo_crus_vary_cast_ref )
					.filter( $mol_guard_defined )
					.map( ref => realm.Node( ref, Node ) ) as readonly any[] as Vals
			}
			
			/** Add new Node which placed in new Land */
			@ $mol_action
			remote_make( preset: $hyoo_crus_rank_preset ): Vals[number] {
				const land = this.$.$hyoo_crus_realm.land_grab( preset )
				this.splice([ land.ref() ])
				return land.Node( ( Value as any )() ).Item('')
			}
			
			/** Add new Node which placed in same Land */
			@ $mol_action
			local_make( idea?: number ): Vals[number] {
				const self = this.land().self_make( idea )
				const node = this.land().Node( ( Value as any )() ).Item( self )
				this.splice([ node.ref() ])
				return node
			}
			
		}
		
		return Ref
	}
	
}
