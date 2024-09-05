namespace $ {
	
	export class $hyoo_crus_app_home_node extends $hyoo_crus_app_home {
		
		@ $mol_mem
		init() {
			
			this.title( $node.os.hostname() )
			
			const source = this.aliases()
			const target = this.Aliases(null)!
			
			for( const ip of target.keys().map( $hyoo_crus_vary_cast_str ) ) {
				if( !ip || !source.has( ip ) ) target.cut( ip )
			}
			
			for( const [ ip, names ] of source ) {
				target.key( ip, null ).items( names )
			}
			
		}
		
		@ $mol_mem
		tick() {
			this.$.$mol_state_time.now( 1000 )
			this.uptime( BigInt( Math.floor( process.uptime() ) ) )
		}
		
		@ $mol_mem
		ips() {
			const ips = [] as string[]
			for( const group of Object.values( $node.os.networkInterfaces() ) ) {
				for( const face of group! ) {
					ips.push( face.address )
				}
			}
			return ips
		}
		
		async lookup( ip: string ) {
			const lookup = $node.util.promisify( $node.dns.reverse )
			try {
				return (await lookup( ip ))
			} catch( error ) {
				$mol_fail_log( error )
				return []
			}
		}
		
		@ $mol_mem
		aliases() {
			const self = $mol_wire_sync( this )
			return new Map( this.ips().map( ip => [ ip, self.lookup( ip ) ] ) )
		}
		
	}
	
	$.$hyoo_crus_app_home = $hyoo_crus_app_home_node
	
}
