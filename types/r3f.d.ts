import type { Object3DNode, MaterialNode, BufferGeometryNode } from '@react-three/fiber';
import type {
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  PlaneGeometry,
  AmbientLight,
} from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: Object3DNode<Mesh, typeof Mesh>;
    ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>;
    planeGeometry: BufferGeometryNode<PlaneGeometry, typeof PlaneGeometry>;
    shaderMaterial: MaterialNode<ShaderMaterial, typeof ShaderMaterial>;
    meshStandardMaterial: MaterialNode<MeshStandardMaterial, typeof MeshStandardMaterial>;
  }
}
