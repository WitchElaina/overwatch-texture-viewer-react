export interface Texture {
  id: string;
  id_raw: number;
  version_added_id: number;
  version_removed_id: number;
  version_updated_id: number;
  version_added: string;
  version_removed: string;
  version_updated: string;
  is_removed: boolean;
  is_new: boolean;
  is_updated: boolean;
  url: string;
}

export interface Version {
  id: number;
  name: string;
}

export interface TextureInfo {
  textures: number[];
  tex_ver_added: number[];
  tex_ver_removed: number[];
  tex_ver_updated: number[];
  versions: string[];
} 