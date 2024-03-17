namespace $.$$ {
	
	$mol_test({
		
		"Empty representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			$mol_assert_equal( reg.value_bool(), null )
			$mol_assert_equal( reg.value_int(), null )
			$mol_assert_equal( reg.value_real(), null )
			$mol_assert_equal( reg.value_bin(), null )
			$mol_assert_equal( reg.value_str(), null )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_bin( null )
			$mol_assert_equal( reg.value_bool(), null )
			$mol_assert_equal( reg.value_int(), null )
			$mol_assert_equal( reg.value_real(), null )
			$mol_assert_equal( reg.value_bin(), null )
			$mol_assert_equal( reg.value_str(), null )
			$mol_assert_equal( reg.value_ref(), null )
			
		},
		
		"Bool representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			reg.value_bool( true )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 1n )
			$mol_assert_equal( reg.value_real(), 1 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 1 ]) )
			$mol_assert_equal( reg.value_str(), 'true' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_bool( false )
			$mol_assert_equal( reg.value_bool(), false )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), 0 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0 ]) )
			$mol_assert_equal( reg.value_str(), 'false' )
			$mol_assert_equal( reg.value_ref(), null )
			
		},
		
		"Int representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			reg.value_int( 4611686018427387904n )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 4611686018427387904n )
			$mol_assert_equal( reg.value_real(), 4611686018427388000 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0x40 ]) )
			$mol_assert_equal( reg.value_str(), '4611686018427387904' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_int( 0n )
			$mol_assert_equal( reg.value_bool(), false )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), 0 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]) )
			$mol_assert_equal( reg.value_str(), '0' )
			$mol_assert_equal( reg.value_ref(), null )
			
		},
		
		"Real representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			reg.value_real( Math.PI )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 3n )
			$mol_assert_equal( reg.value_real(), Math.PI )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 24, 45, 68, 84, 251, 33, 9, 64 ]) )
			$mol_assert_equal( reg.value_str(), '3.141592653589793' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_real( 0 )
			$mol_assert_equal( reg.value_bool(), false )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), 0 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]) )
			$mol_assert_equal( reg.value_str(), '0' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_real( -Math.PI )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), -3n )
			$mol_assert_equal( reg.value_real(), -Math.PI )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 24, 45, 68, 84, 251, 33, 9, 192 ]) )
			$mol_assert_equal( reg.value_str(), '-3.141592653589793' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_real( Number.NaN )
			$mol_assert_equal( reg.value_bool(), false )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), Number.NaN )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0, 0, 0, 0, 0, 0, 248, 127 ]) )
			$mol_assert_equal( reg.value_str(), 'NaN' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_real( Number.POSITIVE_INFINITY )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), Number.POSITIVE_INFINITY )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 127 ]) )
			$mol_assert_equal( reg.value_str(), 'Infinity' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_real( Number.NEGATIVE_INFINITY )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), Number.NEGATIVE_INFINITY )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 255 ]) )
			$mol_assert_equal( reg.value_str(), '-Infinity' )
			$mol_assert_equal( reg.value_ref(), null )
			
		},
		
		"Bin representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			reg.value_bin( new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 3n )
			$mol_assert_equal( reg.value_real(), 3 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_equal( reg.value_str(), '010203' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_bin( new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]) )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 40n )
			$mol_assert_equal( reg.value_real(), 40 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0, 1,2,3,4,5,6,7,8,9,0 ]) )
			$mol_assert_equal( reg.value_str(), '01020304050607080900010203040506070809000102030405060708090001020304050607080900' )
			$mol_assert_equal( reg.value_ref(), null )
			
		},
		
		"String representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			reg.value_str( 'foo' )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), null )
			$mol_assert_equal( reg.value_real(), Number.NaN )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([ 102, 111, 111 ]) )
			$mol_assert_equal( reg.value_str(), 'foo' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_str( '123456789012345678901234567890123456789' )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), 123456789012345678901234567890123456789n )
			$mol_assert_equal( reg.value_real(), 1.2345678901234568e+38 )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([
				49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
				49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
				49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
				49, 50, 51, 52, 53, 54, 55, 56, 57,
			]) )
			$mol_assert_equal( reg.value_str(), '123456789012345678901234567890123456789' )
			$mol_assert_equal( reg.value_ref(), null )
			
			reg.value_str( '' )
			$mol_assert_equal( reg.value_bool(), false )
			$mol_assert_equal( reg.value_int(), 0n )
			$mol_assert_equal( reg.value_real(), null )
			$mol_assert_equal( reg.value_bin(), null )
			$mol_assert_equal( reg.value_str(), '' )
			$mol_assert_equal( reg.value_ref(), null )
			
		},
		
		"Reference representation"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('12345678')
			
			reg.value_ref( reg.ref() )
			$mol_assert_equal( reg.value_bool(), true )
			$mol_assert_equal( reg.value_int(), null )//land.lord_ref().description + ( 123n << 96n ) )
			$mol_assert_equal( reg.value_real(), null )
			$mol_assert_equal( reg.value_bin(), new Uint8Array([
				213, 212, 219, 170, 109, 71,
				174, 214, 197, 34, 45, 170,
				215, 109, 248, 231, 174, 252,
			]) )
			$mol_assert_equal( reg.value_str(), reg.ref().description! )
			$mol_assert_equal( reg.value_ref(), reg.ref() )
			
		},
		
		"Store custom types"( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const reg = land.Node( $hyoo_crus_reg ).Item('')
			
			$mol_assert_equal( reg.value_as( $mol_data_email ), null )
			
			reg.value_as( $mol_data_email, 'foo@exaple.org' )
			$mol_assert_equal( reg.value_as( $mol_data_email ), 'foo@exaple.org' )
			
			$mol_assert_fail( ()=> reg.value_as( $mol_data_email, 'xxx' ), 'xxx is not a /.+@.+/' )
			$mol_assert_equal( reg.value_as( $mol_data_email ), 'foo@exaple.org' )
			
			reg.value_str( 'xxx' )
			$mol_assert_equal( reg.value_as( $mol_data_email ), null )
			
		},
		
		"Hyper link to another land"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home()
			
			const reg = land.Node( $hyoo_crus_reg ).Item( '11111111' )
			const remote = reg.yoke( $hyoo_crus_rank_public )!.Data( $hyoo_crus_reg )
			
			$mol_assert_unique( reg.land(), remote.land() )
			$mol_assert_equal( reg.value_ref(), remote.ref() )
			$mol_assert_equal( reg.yoke( $hyoo_crus_rank_public )!.Data( $hyoo_crus_reg ), remote )
			
		},
		
		"Narrow registers"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home()
			
			const bin = land.Node( $hyoo_crus_reg_bin ).Item('11111111')
			$mol_assert_equal( bin.value(), null )
			bin.value( new Uint8Array([ 1, 2, 3 ]) )
			$mol_assert_equal( bin.value(), new Uint8Array([ 1, 2, 3 ]) )
			
			const str = land.Node( $hyoo_crus_reg_str ).Item('22222222')
			$mol_assert_equal( str.value(), null )
			str.value( 'foo' )
			$mol_assert_equal( str.value(), 'foo' )
			
		},
		
		"Register with linked nodes"( $ ) {
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home()
			
			const str = land.Node( $hyoo_crus_reg_str ).Item('11111111')
			const ref = land.Node( $hyoo_crus_reg.ref( ()=> $hyoo_crus_reg_str ) ).Item('11111111')
			$mol_assert_equal( ref.remote(), null )
			
			ref.remote( str )
			$mol_assert_equal( ref.value_ref(), ref.remote()!.ref(), str.ref() )
			
		},
		
		"Enuerated reg type"( $ ) {
			
			class FileType extends $hyoo_crus_reg.enum( [ 'file', 'dir', 'link' ] as const ) {}
			
			type Infered = $mol_type_assert<
				ReturnType< FileType['value'] >,
				'file' | 'dir' | 'link' | null
			>
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home()
			
			const type = land.Data( FileType )
			$mol_assert_equal( type.value(), null )
			
			type.value( 'file' )
			$mol_assert_equal( type.value(), 'file' )
			
			$mol_assert_fail( ()=> type.value( 'drive' as any ), 'Wrong value (drive)' )
			$mol_assert_equal( type.value(), 'file' )
			
			type.value_str( 'drive' )
			$mol_assert_equal( type.value(), null )
			
		},
		
	})
	
}
